package com.blawniczak.dao

import com.blawniczak.model.User
import java.io.Closeable

interface DaoFacade : Closeable {

    fun user(userId: String, hash: String? = null): User?
    fun createUser(user: User)
    fun userByEmail(email: String): User?

}