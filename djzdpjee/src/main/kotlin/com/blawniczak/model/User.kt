package com.blawniczak.model

import java.io.Serializable

data class User(val id: Int, val email: String, val name: String, val surname: String, val password: String)  : Serializable
