package com.blawniczak.model

import com.blawniczak.dao.Details
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass

class Detail(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<Detail>(Details)
    var address by Details.address
    var userId by User referencedOn Details.userId
}