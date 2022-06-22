//
//  HomePage.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct HomePage: View {
    
    @State var candidates : [Candidate]
    
    init() {
        candidates = [
            Candidate(id: 0, firstname: "Jean", lastname: "Lasalle", party: "Résistons !", program: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", profilePicture: "https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/5a05d9f7-53f5-40fe-b144-0384b813517a/1200x680_maxnewsworldfive469097.jpg"),
            Candidate(id: 1, firstname: "Jean", lastname: "Lasalle", party: "Résistons !", program: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", profilePicture: "https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/5a05d9f7-53f5-40fe-b144-0384b813517a/1200x680_maxnewsworldfive469097.jpg"),
            Candidate(id: 2, firstname: "Jean", lastname: "Lasalle", party: "Résistons !", program: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", profilePicture: "https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/5a05d9f7-53f5-40fe-b144-0384b813517a/1200x680_maxnewsworldfive469097.jpg")
       
       
        ]
    }
    
    @State var currentIndex: Int = 0
    
    var body: some View {
        
        VStack{
            
            
            SnapCarousel(spacing: 25,index: $currentIndex, items: candidates) { current in
                GeometryReader{ proxy in
                    let size = proxy.size

                    VStack{
                        Spacer()
                        CandidateCard(candidate: current)
                            .frame(width: size.width)
                        Spacer()
                    }

                }
            }
            
        }
    }
    
}

struct SnapCarousel<Content : View, T: Identifiable> : View {
    var content : (T) -> Content
    var list : [T]
    
    var spacing: CGFloat
    var trailingSpace: CGFloat
    
    @Binding var index : Int
    
    init(spacing: CGFloat = 15, trailingSpace: CGFloat = 100, index: Binding<Int>, items: [T], @ViewBuilder content : @escaping (T)-> Content){
        self.list = items
        self.spacing = spacing
        self.trailingSpace = trailingSpace
        self._index = index
        self.content = content
    }
    
    @GestureState var offset : CGFloat = 0
    @State var currentIndex : Int = 0
    
    var body: some View {
        GeometryReader { proxy in
            
            let width = (proxy.size.width - (trailingSpace - spacing))
            let adjustMentWidth = (trailingSpace / 2) - spacing
            HStack(spacing: spacing){
                ForEach(list){ item in
                    content(item)
                        .frame(width: proxy.size.width - trailingSpace)
                }
            }
            .padding(.horizontal, spacing)
            .offset(x : (CGFloat(currentIndex) * -width) + (currentIndex  != 0 ? adjustMentWidth : 0) + offset)
            .gesture(
                DragGesture()
                    .updating($offset, body: { value, out, _
                        in
                        out = value.translation.width
                    })
                    .onEnded({ value in
                        let offsetX = value.translation.width
                        let progress = -offsetX / width
                        let roundIndex = progress.rounded() * 1.3
                        currentIndex = max(min(currentIndex + Int(roundIndex), list.count - 1), 0)
                        
                        currentIndex = index
                    })
                    .onChanged({ value in
                        let offsetX = value.translation.width
                        let progress = -offsetX / width
                        let roundIndex = progress.rounded() * 1.3
                        index = max(min(currentIndex + Int(roundIndex), list.count - 1), 0)
                    })
            )
        }
        .animation(.easeInOut, value: offset == 0)
    }
}

struct HomePage_Previews: PreviewProvider {
    static var previews: some View {
        HomePage()
    }
}
