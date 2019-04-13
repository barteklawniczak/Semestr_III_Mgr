package com.blawniczak.dao

import com.blawniczak.model.User
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.joda.time.*
import java.io.*

class DaoFacadeDatabase(val db: Database): DaoFacade {

    constructor() : this(
        Database.connect(
            "jdbc:mysql://superuser:admin@localhost:3306/djzdpjee?useUnicode=true&serverTimezone=UTC",
            driver = "com.mysql.jdbc.Driver"
        )
    )

    override fun user(userId: String, hash: String?): User? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun createUser(user: User) {
        transaction {
            Users.insert {
                //it[id] = user.id
                it[email] = user.email
                it[name] = user.name
                it[surname] = user.surname
                it[password] = user.password
            }
        }
    }

    override fun userByEmail(email: String): User? {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun close() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}