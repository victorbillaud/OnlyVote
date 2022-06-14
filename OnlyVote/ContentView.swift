//
//  ContentView.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct ContentView: View {
    @Environment(\.colorScheme) var colorScheme
    
    @State private var tabSelection = 2

    
    init() {
        UITabBar.appearance().backgroundColor = UIColor(Color("Primary"))
    }
    
    var body: some View {
        ZStack{
            TabView(selection: $tabSelection) {
                VotePage()
                    .tabItem {
                        Label("Vote", systemImage: "archivebox")
                    }
                    .tag(1)
                HomePage()
                    .tabItem {
                        Label("Candidates", systemImage: "person.crop.circle")
                    }
                    .tag(2)
                AccountPage()
                    .tabItem {
                        Label("User", systemImage: "gear")
                    }
                    .tag(3)
            }
            .accentColor(Color("Secondary"))
            VStack{
                HStack{
                    Image(colorScheme == .dark ? "DarkLogo" :"Logo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 120, alignment: .topLeading)
                    Spacer()
                    Button {
                        self.tabSelection = 1
                    } label: {
                        Text("Voter")
                            .padding()
                            .font(Font.custom("Marianne-Medium", size: 18))
                            .foregroundColor(.white)
                            .background(Color("Bleu France"))
                    }

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
