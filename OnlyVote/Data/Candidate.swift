//
//  Candidate.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import Foundation

struct Candidate: Identifiable, Codable, Equatable, Hashable {
    var id : Int
    var firstname : String
    var lastname : String
    var party : String
    var program : String
    var profilePicture : String
}


