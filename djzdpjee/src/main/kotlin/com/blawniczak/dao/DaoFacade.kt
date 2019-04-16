package com.blawniczak.dao

import com.blawniczak.model.Detail
import com.blawniczak.model.User
import com.blawniczak.model.UserData
import java.io.Closeable

interface DaoFacade : Closeable {

    fun createUser(user: UserData)
    fun createDetails(id: Int, enteredAddress: String)
    fun updateUser(user: UserData)
    fun updateDetail(id: Int, address: String)
    fun userByEmail(email: String): UserData?
    fun userById(id: Int): UserData?
    fun detailsById(id: Int): Detail?
    fun getAllUsers(): ArrayList<UserData>
    fun getAllUserDetails(id: Int): ArrayList<Detail>
    fun login(email: String, password: String): UserData?

}