package com.example.onlyvote.ui.candidates

/**
 * ViewPager items definition and initialisation
 * @param name
 * @param party
 * @param program
 * @param profile
 */
class ViewPagerItem constructor (name: String, party: String, program: String, profile: String) {
    val name: String
    val party: String
    val program: String
    val profile: String

    init {
        this.name = name
        this.party = party
        this.program = program
        this.profile = profile
    }
}