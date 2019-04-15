package com.blawniczak.dao

import com.blawniczak.model.User
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

class DaoFacadeDatabase(val db: Database): DaoFacade {

    constructor() : this(
        Database.connect(
            "jdbc:mysql://superuser:admin@localhost:3306/djzdpjee?useUnicode=true&serverTimezone=UTC",
            driver = "com.mysql.jdbc.Driver"
        )
    )

    override fun createUser(user: User) {
        transaction {
            Users.insert {
                it[email] = user.email
                it[name] = user.name
                it[surname] = user.surname
                it[password] = user.password
            }
        }
    }

    override fun updateUser(user: User) {
        transaction {
            Users.update({ Users.id eq user.id }) {
                it[email] = user.email
                it[name] = user.name
                it[surname] = user.surname
            }
        }
    }

    override fun userByEmail(email: String) =
        transaction {
            Users.select { Users.email.eq(email) }
                .map { User(it[Users.id], email, it[Users.name], it[Users.surname], it[Users.password]) }.singleOrNull()
        }

    override fun getAllUsers(): ArrayList<User> {
        val users = ArrayList<User>()
        transaction {
            val res = Users.selectAll().orderBy(Users.id, false)
            for (f in res) {
                users.add(User(id = f[Users.id], email = f[Users.email], name = f[Users.name], surname = f[Users.surname], password = f[Users.password]))
            }
        }
        return users
    }

    override fun login(email: String, password: String) =
        transaction {
            Users.select { Users.email.eq(email) }
                .mapNotNull {
                    if (it[Users.password] == password) {
                        User(it[Users.id], it[Users.email], it[Users.name], it[Users.surname], it[Users.password])
                    } else {
                        null
                    }
                }
                .singleOrNull()
        }

    override fun close() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}