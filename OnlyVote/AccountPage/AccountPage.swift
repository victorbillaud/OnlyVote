//
//  AccountPage.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct AccountPage: View {
    var body: some View {
        ZStack{
            Color.blue
            
            Image(systemName: "person.fill")
                .foregroundColor(Color.white)
                .font(.system(size: 100))
        }
    }
}

struct AccountPage_Previews: PreviewProvider {
    static var previews: some View {
        AccountPage()
    }
}
