package com.blawniczak.dao

import org.jetbrains.exposed.sql.Table

object Details : Table("DETAILS") {
    val id = Details.integer("id").primaryKey().autoIncrement()
    val address = Details.varchar("address", length = 64)
}