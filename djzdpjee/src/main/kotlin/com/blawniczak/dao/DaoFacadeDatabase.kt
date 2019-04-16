package com.blawniczak.dao

import com.blawniczak.model.Detail
import com.blawniczak.model.User
import com.blawniczak.model.UserData
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.math.absoluteValue

class DaoFacadeDatabase(val db: Database): DaoFacade {

    constructor() : this(
        Database.connect(
            "jdbc:mysql://superuser:admin@localhost:3306/djzdpjee?useUnicode=true&serverTimezone=UTC",
            driver = "com.mysql.jdbc.Driver"
        )
    )

    override fun createUser(user: UserData) {
        transaction {
            Users.insert {
                it[email] = user.email
                it[name] = user.name
                it[surname] = user.surname
                it[password] = user.password
            }
        }
    }

    override fun createDetails(id: Int, enteredAddress: String) {
        transaction {
            Details.insert {
                it[address] = enteredAddress
                it[userId] = EntityID(id, Users)
            }
        }
    }

    override fun updateUser(user: UserData) {
        transaction {
            Users.update({ Users.id eq user.id }) {
                it[email] = user.email
                it[name] = user.name
                it[surname] = user.surname
            }
        }
    }

    override fun updateDetail(id: Int, addressUpdated: String) {
        transaction {
            Details.update({ Details.id eq id }) {
                it[address] = addressUpdated
            }
        }
    }

    override fun userByEmail(email: String) =
        transaction {
            Users.select { Users.email.eq(email) }
                .map { UserData(it[Users.id].value, email, it[Users.name], it[Users.surname], it[Users.password]) }.singleOrNull()
        }

    override fun userById(id: Int) =
        transaction {
            Users.select { Users.id.eq(id) }
                .map { UserData(id, it[Users.email], it[Users.name], it[Users.surname], it[Users.password]) }.singleOrNull()
        }

    override fun detailsById(id: Int): Detail? =
        transaction {
            Detail.findById(id)
    }

    override fun getAllUsers(): ArrayList<UserData> {
        val users = ArrayList<UserData>()
        transaction {
            val res = Users.selectAll().orderBy(Users.id, false)
            for (f in res) {
                users.add(UserData(id = f[Users.id].value, email = f[Users.email], name = f[Users.name], surname = f[Users.surname], password = f[Users.password]))
            }
        }
        return users
    }

    override fun getAllUserDetails(id: Int): ArrayList<Detail> {
        val details = ArrayList<Detail>()
        transaction {
            Detail.find { Details.userId eq id }.toCollection(details)
        }
        return details
    }

    override fun login(email: String, password: String) =
        transaction {
            Users.select { Users.email.eq(email) }
                .mapNotNull {
                    if (it[Users.password] == password) {
                        UserData(it[Users.id].value, it[Users.email], it[Users.name], it[Users.surname], it[Users.password])
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