package com.blawniczak

import com.blawniczak.dao.DaoFacade
import com.blawniczak.dao.DaoFacadeDatabase
import com.blawniczak.dao.Users
import com.blawniczak.model.User
import freemarker.cache.ClassTemplateLoader
import com.google.gson.Gson
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.freemarker.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.locations.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.sessions.*
import io.ktor.util.hex
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

data class IndexData(val items: List<Int>)

data class Register(val email: String = "", val name: String = "", val surname: String = "", val password: String = "", val error: String = "")
val dao: DaoFacade = DaoFacadeDatabase()

@KtorExperimentalLocationsAPI
fun main(args: Array<String>) {
    val hashFunction = { s: String -> hash(s) }
    val server = embeddedServer(Netty, 8080) {
        install(DefaultHeaders)
        install(CallLogging)
        install(Locations)
        install(FreeMarker) {
            templateLoader = ClassTemplateLoader(this::class.java.classLoader, "")
        }
        install(Authentication) {
            form("login") {
                userParamName = "username"
                passwordParamName = "password"
                challenge = FormAuthChallenge.Unauthorized
                validate { credentials -> if (credentials.name == credentials.password) UserIdPrincipal(credentials.name) else null }
            }
        }
        install(Sessions) {
            cookie<UserSession>("SESSION") {
                transform(SessionTransportTransformerMessageAuthentication(hashKey))
            }
        }
        routing {
            static("/static") {
                resources("static")
            }
            get("/") {
                call.respondRedirect("/register")
            }
            get("/logout") {
                call.sessions.clear<UserSession>()
                call.respondRedirect("/login")

            }
            route("/login") {
                get {
                    val loggedUser = call.sessions.get<UserSession>()?.let { dao.userByEmail(it.email) }

                    if (loggedUser != null) {
                        call.respondRedirect("/edit")
                    } else {
                        call.respond(FreeMarkerContent("login.ftl", null))
                    }
                }
                post {
                    val login = call.receiveParameters()
                    val email = login["email"]
                    val password = login["password"]

                    if (email=="" || password=="") {
                        return@post call.respond(FreeMarkerContent("login.ftl", mapOf("error" to "Invalid login")))
                    } else {
                        val loggedUser = dao.login(email!!, hash(password!!))
                        if(loggedUser==null) {
                            return@post call.respond(FreeMarkerContent("login.ftl", mapOf("error" to "Invalid login")))
                        } else {
                            call.sessions.set(UserSession(loggedUser.email))
                            call.respondRedirect("/edit")
                        }
                    }
                }
            }
            route("/register") {
                get {
                    val loggedUser = call.sessions.get<UserSession>()?.let { dao.userByEmail(it.email) }

                    if (loggedUser != null) {
                        call.respondRedirect("/edit")
                    } else {
                        call.respond(FreeMarkerContent("register.ftl", mapOf("user" to Register())))
                    }
                }
                post {
                    val registration = call.receiveParameters()
                    val email = registration["email"]
                    val name = registration["name"]
                    val surname = registration["surname\""]
                    val password = registration["password"]
                    val user = Register(email!!, name!!, surname!!, password!!)
                    if (email=="" || name=="" || surname=="" || password=="")
                        return@post call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "Incomplete data!")))

                    when {
                        password.length < 5 -> {
                            call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "Password too short!")))
                        }
                        !password.matches(Regex(".*[A-Z].*")) -> {
                            call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "Password must contain at least one big letter!")))
                        }
                        !password.matches(Regex(".*[!@#\\\$%\\^&].*")) -> {
                            call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "Password must contain at least one special character!")))
                        }
                        else -> {
                            val hash = hashFunction(password)
                            println(hash)
                            val newUser = User(0, email, name, surname, hash)
                            try {
                                dao.createUser(newUser)
                            } catch (e: Throwable) {
                                when {
                                    dao.userByEmail(email) != null -> {
                                        call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "User with the following email $email is already registered")))
                                    }
                                    else -> {
                                        call.respond(FreeMarkerContent("register.ftl", mapOf("user" to user, "error" to "Registration failed!")))
                                    }
                                }
                            }
                            call.respondRedirect("/login")
                        }
                    }
                }
            }
            route("/edit") {
                get {
                    val loggedUser = call.sessions.get<UserSession>()?.let { dao.userByEmail(it.email) }
                    if(loggedUser==null) {
                        call.respondRedirect("/login")
                    } else {
                        call.respond(FreeMarkerContent("edit.ftl", mapOf("loggedUser" to loggedUser)))
                    }
                }
            }
        }
    }
    server.start(wait = true)
}

data class UserSession(val email: String)
val hashKey = hex("631757516945196845339089")
val hmacKey = SecretKeySpec(hashKey, "HmacSHA1")
fun hash(password: String): String {
    val hmac = Mac.getInstance("HmacSHA1")
    hmac.init(hmacKey)
    return hex(hmac.doFinal(password.toByteArray(Charsets.UTF_8)))
}