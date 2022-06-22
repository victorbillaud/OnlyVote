//
//  CandidateCard.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct CandidateCard: View {
    

    @State var candidate : Candidate
    
//    init(){
//        candidate = Candidate(id: 1, firstname: "Jean", lastname: "Lasalle", party: "Résistons !", program: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", profilePicture: "https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/5a05d9f7-53f5-40fe-b144-0384b813517a/1200x680_maxnewsworldfive469097.jpg")
//    }
    

    
    var body: some View {
        VStack{
            AsyncImage(
                url: URL(string: candidate.profilePicture),
                content: { image in
                    image
                        .resizable()
                        .scaledToFill()
                        .frame(width: 200, height: 200)
                        .clipShape(Circle())
                },
                placeholder: {
                    ProgressView()
                }
            )
            .padding(.top, 40)
            .padding(.leading, 40)
            .padding(.trailing, 40)
            .padding(.bottom, 10)
            
            Text(candidate.firstname + " " + candidate.lastname)
                .font(Font.custom("Marianne-Medium", size: 23))
                .foregroundColor(Color("Bleu France"))
                .padding()
            
            Text(candidate.party)
                .font(Font.custom("Marianne-Medium", size: 23))
                .padding()
            
            Text(candidate.program)
                .font(Font.custom("Marianne-Regular", size: 16))
                .padding()
                .lineLimit(8)
            
            
        }
        .background(Color("Primary"))
        .shadow(color: Color.black.opacity(0.1), radius: 20, x: 0, y: 10)
    }
}

struct CandidateCard_Previews: PreviewProvider {
    static var previews: some View {
        CandidateCard(candidate: Candidate(id: 1, firstname: "Jean", lastname: "Lasalle", party: "Résistons !", program: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", profilePicture: "https://cdn.radiofrance.fr/s3/cruiser-production/2022/02/5a05d9f7-53f5-40fe-b144-0384b813517a/1200x680_maxnewsworldfive469097.jpg"))
    }
}
