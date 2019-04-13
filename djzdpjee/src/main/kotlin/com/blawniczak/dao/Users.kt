package com.blawniczak.dao

import org.jetbrains.exposed.sql.Table

object Users : Table("USERS") {
    val id = integer("id").primaryKey().autoIncrement()
    val email = varchar("email", length = 64).uniqueIndex()
    val name = varchar("name", length = 64)
    val surname = varchar("surname", length = 64)
    val password = varchar("password", length = 64)
}