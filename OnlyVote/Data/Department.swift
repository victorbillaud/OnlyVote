//
//  Department.swift
//  OnlyVote
//
//  Created by Victor Billaud on 20/06/2022.
//

import Foundation


struct Town: Identifiable, Codable, Equatable, Hashable {
    var id : Int
    var DEP : Int
    var NCCENR : String
}

class DepartmentController: ObservableObject {
    @Published var towns: [Town] = []
    
    func loadTowns(department: Int) {
        ApiService().getTowns(department: department) { places in
            self.towns = places;
            print(places)
        }
    }
}
