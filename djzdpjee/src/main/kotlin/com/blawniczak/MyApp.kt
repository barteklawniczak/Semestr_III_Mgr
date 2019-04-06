package com.blawniczak

import freemarker.cache.ClassTemplateLoader
import com.google.gson.Gson
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.features.*
import io.ktor.freemarker.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

data class IndexData(val items: List<Int>)

object Users : Table("USERS") {
    val id = integer("id").primaryKey()
    val email = varchar("email", length = 64)
    val name = varchar("name", length = 64)
    val surname = varchar("surname", length = 64)
}

data class User(val id: Int, val email: String, val name: String, val surname: String)

fun initDB() {
    val url = "jdbc:mysql://superuser:admin@localhost:3306/djzdpjee?useUnicode=true&serverTimezone=UTC"
    val driver = "com.mysql.jdbc.Driver"
    Database.connect(url, driver)
}

fun main(args: Array<String>) {
    initDB()
    val server = embeddedServer(Netty, 8080) {
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
        routing {
            get("/") {
                call.respondText(getTopUsers(), ContentType.Text.Html)
            }
            get("/html-freemarker") {
                call.respond(FreeMarkerContent("index.ftl", mapOf("data" to IndexData(listOf(1, 2, 3))), ""))
            }
            static("/static") {
                resources("static")
            }
            route("/login") {
                get {
                    call.respond(FreeMarkerContent("login.ftl", null))
                }
                post {
                    val post = call.receiveParameters()
                    if (post["username"] != null && post["username"] == post["password"]) {
                        call.respondText("OK")
                    } else {
                        call.respond(FreeMarkerContent("login.ftl", mapOf("error" to "Invalid login")))
                    }
                }
            }
        }
    }
    server.start(wait = true)
}

fun getTopUsers(): String {
    var json: String = ""
    transaction {
        val res = Users.selectAll().orderBy(Users.id, false).limit(5)
        val c = ArrayList<User>()
        for (f in res) {
            c.add(User(id = f[Users.id], email = f[Users.email], name = f[Users.name], surname = f[Users.surname]))
        }
        json = Gson().toJson(c)
    }
    return json
}