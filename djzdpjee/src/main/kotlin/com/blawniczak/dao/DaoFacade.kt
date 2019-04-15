package com.blawniczak.dao

import com.blawniczak.model.User
import java.io.Closeable

interface DaoFacade : Closeable {

    fun createUser(user: User)
    fun updateUser(user: User)
    fun userByEmail(email: String): User?
    fun userById(id: Int): User?
    fun getAllUsers(): ArrayList<User>
    fun login(email: String, password: String): User?

}