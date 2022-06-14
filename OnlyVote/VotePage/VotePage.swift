//
//  VotePage.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct VotePage: View {
    var body: some View {
        ZStack{
            
            Image(systemName: "person.fill")
                .foregroundColor(Color.blue)
                .font(.system(size: 100))
        }
    }
}

struct VotePage_Previews: PreviewProvider {
    static var previews: some View {
        VotePage()
    }
}
