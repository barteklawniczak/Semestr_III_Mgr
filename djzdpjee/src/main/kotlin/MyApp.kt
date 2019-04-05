package com.blawniczak

import freemarker.cache.ClassTemplateLoader
import io.ktor.application.*
import io.ktor.content.resources
import io.ktor.content.static
import io.ktor.features.*
import io.ktor.freemarker.FreeMarker
import io.ktor.freemarker.FreeMarkerContent
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

data class IndexData(val items: List<Int>)

fun main(args: Array<String>) {
    val server = embeddedServer(Netty, 8080) {
        install(FreeMarker) {
            templateLoader = ClassTemplateLoader(this::class.java.classLoader, "")
        }
        routing {
            get("/") {
                call.respondText("Hello, world!", ContentType.Text.Html)
            }
            get("/html-freemarker") {
                call.respond(FreeMarkerContent("index.ftl", mapOf("data" to IndexData(listOf(1, 2, 3))), ""))
            }
            static("/static") {
                resources("static")
            }
        }
    }
    server.start(wait = true)
}
