package com.blawniczak.dao

import com.blawniczak.model.User
import java.io.Closeable

interface DaoFacade : Closeable {

    fun createUser(user: User)
    fun userByEmail(email: String): User?

}