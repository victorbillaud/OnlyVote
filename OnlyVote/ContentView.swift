//
//  ContentView.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct ContentView: View {
    
    init() {
        UITabBar.appearance().backgroundColor = UIColor(Color("Primary"))
    }
    
    var body: some View {
        ZStack{
            TabView {
                VotePage()
                    .tabItem {
                        Label("Vote", systemImage: "archivebox")
                    }
                HomePage()
                    .tabItem {
                        Label("Candidates", systemImage: "person.crop.circle")
                    }
                AccountPage()
                    .tabItem {
                        Label("User", systemImage: "gear")
                    }
            }
            .accentColor(Color("Secondary"))
            VStack{
                HStack{
                    Image("DarkLogo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120, alignment: .topLeading)
                    Spacer()
                    Text("Victor")
                }
                .padding()
                .background(Color("Primary"))
                .shadow(color: Color.black.opacity(0.1), radius: 20, x: 0, y: 10)
                
                Spacer()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
