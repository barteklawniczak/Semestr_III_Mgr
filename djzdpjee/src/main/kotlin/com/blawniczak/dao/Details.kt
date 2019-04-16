package com.blawniczak.dao

import org.jetbrains.exposed.dao.IntIdTable

object Details : IntIdTable("DETAILS") {
    // val id = integer("id").primaryKey().autoIncrement()
    val address = varchar("address", length = 64)
    val userId = reference("userId", Users)
}