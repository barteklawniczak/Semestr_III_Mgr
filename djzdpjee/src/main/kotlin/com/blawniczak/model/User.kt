package com.blawniczak.model

import com.blawniczak.dao.Details
import com.blawniczak.dao.Users
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import java.io.Serializable

class User(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<User>(Users)
    var email by Users.email
    var name by Users.name
    var surname by Users.surname
    var password by Users.password
    val details by Detail referrersOn Details.userId
}

data class UserData(val id: Int, val email: String, val name: String, val surname: String, val password: String) : Serializable