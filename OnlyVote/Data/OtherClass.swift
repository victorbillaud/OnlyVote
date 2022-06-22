//
//  OtherClass.swift
//  OnlyVote
//
//  Created by Victor Billaud on 22/06/2022.
//

import Foundation

enum Gender: String, CaseIterable, Identifiable {
    case male = "homme", female = "femme"
    var id: Self { self }
}

struct RegisterResponse: Codable, Equatable, Hashable {
    var response: String
}
