package com.example.onlyvote.data

/**
 * Candidate elements to get from api
 */
class CandidateRequest (
    val id: Int,
    val firstname: String,
    val lastname: String,
    val party: String,
    val program: String,
    val profilePicture: String
)