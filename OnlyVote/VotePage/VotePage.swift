//
//  VotePage.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct VotePage: View {
    @State var candidates : [Candidate] = []

    @State var userChoice = 1
    @State private var phoneNumber = ""
    @State private var verifCode = ""
    @State private var isPhoneValid = true
    
    // BLUR USER CHOICE
    
    @State private var blur = true
    
    @State var userHaveChoose = false
    @State var codeIsSend = false
    @State var voteIsDone = false
    @State var alreadyVoted = false
    @State private var returnMessage = "";

    
    var body: some View {
        VStack{
            if(voteIsDone){
                VStack{
                    Text("Félicitations !")
                        .font(Font.custom("Marianne-Medium", size: 20))
                        .padding()
                    Text("Votre vote à bien été enregistré ")
                        .font(Font.custom("Marianne-Regular", size: 20))
                    Button {
                        userHaveChoose = false
                        codeIsSend = false
                        voteIsDone = false
                        alreadyVoted = false
                        returnMessage = ""
                    } label: {
                        Text("Recommencer")
                            .padding()
                            .foregroundColor(Color("Bleu France"))
                    }

                }
            } else if(alreadyVoted){
                VStack{
                    Text("Désolé !")
                        .font(Font.custom("Marianne-Medium", size: 20))
                        .padding()
                    Text(returnMessage)
                        .font(Font.custom("Marianne-Regular", size: 20))
                    Button {
                        userHaveChoose = false
                        codeIsSend = false
                        voteIsDone = false
                        alreadyVoted = false
                        returnMessage = ""
                    } label: {
                        Text("Recommencer")
                            .padding()
                            .foregroundColor(Color("Bleu France"))
                    }
                }
            } else {
                if(userHaveChoose){
                    if(codeIsSend == true){
                        formVerifSMS
                    }else{
                        formSendSMS
                    }
                }else{
                    voteChoice
                }
            }
        }
        .onAppear(){
            ApiService().getCandidate {resultCandidate in
                self.candidates = resultCandidate
                print(resultCandidate)
            }
        }
        
    }
    
    private var formSendSMS: some View{
        VStack{
                    
            HStack(spacing: 4){
                Text("Votre choix est ")
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .onTapGesture {
                        blur.toggle()
                    }
                
                Text("\(candidates[userChoice-1].firstname)")
                    .foregroundColor(Color("Bleu France"))
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .blur(radius: blur == true ? 15 : 0)
                    .onTapGesture {
                        withAnimation {
                            blur.toggle()
                        }
                    }
                Text("\(candidates[userChoice-1].lastname)")
                    .animation(.linear(duration: 1), value: 1)
                    .foregroundColor(Color("Bleu France"))
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .blur(radius: blur == true ? 15 : 0)
                    .onTapGesture {
                        withAnimation {
                            blur.toggle()
                        }
                    }
            }
            .padding(.bottom, 30)
            
            Button {
                withAnimation {
                    userHaveChoose = false
                }
            } label: {
                Text("Changer mon vote")
                    .foregroundColor(Color("Bleu France"))
            }
            
            
            Text("Avant de valider votre vote nous avons besoin de vérifier votre identité, pour ce faire un code de vérification va être envoyé sur votre téléphone.")
                .padding()
                .font(Font.custom("Marianne-Regular", size: 16))
            
            Text("Merci de reseigner le numéro de téléphone ci-dessous")
                .padding()
                .font(Font.custom("Marianne-Medium", size: 16))
            
            
            HStack{
                Image(systemName: "phone.fill")
                    .foregroundColor(Color("Bleu France"))
                Divider()
                    .foregroundColor(Color("Bleu France"))
                    .frame(height: 30)
                TextField("Numéro de téléphone", text: $phoneNumber, onEditingChanged: { (isChanged) in
                    if !isChanged {
                        if self.textFieldValidatorPhone(value: self.phoneNumber) {
                            self.isPhoneValid = true
                        } else {
                            self.isPhoneValid = false
                        }
                    }
                })
                    .disableAutocorrection(true)
                    .autocapitalization(.none)
                    .keyboardType(.decimalPad)
                    .padding()
                    .frame(width: 260, height: 50, alignment: .center)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(.red, lineWidth: self.isPhoneValid ? 0 : 2)
                    )
                    .cornerRadius(10)
                    .background(Color.black.opacity(0.03))
                    .cornerRadius(10)
            }
            .padding(.bottom, 30)
            
            Button("Envoyer le code", action: {
                ApiService().sendCode(phone: phoneNumber) { response in
                    if(response.result == true){
                        withAnimation {
                            codeIsSend = true
                        }
                    }else{
                        alreadyVoted = true
                        returnMessage = response.message
                    }
                }
            })
            .padding(10)
            .font(Font.custom("Marianne-Medium", size: 20))
            .background(Color("Bleu France"))
            .foregroundColor(Color("Primary"))
        }
        .padding(.bottom, 30)
    }
    
    private var formVerifSMS: some View{
        VStack{
            
            Text("Veuillez entrer le code a 6 chiffres que vous avez reçu par SMS au \(phoneNumber)")
                .padding()
                .font(Font.custom("Marianne-Regular", size: 16))
            
            HStack{
                TextField("Entrez le code reçu", text: $verifCode)
                    .disableAutocorrection(true)
                    .autocapitalization(.none)
                    .keyboardType(.decimalPad)
                    .padding()
                    .frame(width: 260, height: 50, alignment: .center)
                    .cornerRadius(10)
                    .background(Color.black.opacity(0.03))
                    .cornerRadius(10)
            }
            
            Text("Attention votre vote est définitif")
                .padding()
                .font(Font.custom("Marianne-Medium", size: 16))
            
            HStack(spacing: 4){
                Text("Votre choix est ")
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .onTapGesture {
                        blur.toggle()
                    }
                
                Text("\(candidates[userChoice-1].firstname)")
                    .foregroundColor(Color("Bleu France"))
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .blur(radius: blur == true ? 15 : 0)
                    .onTapGesture {
                        withAnimation {
                            blur.toggle()
                        }
                    }
                Text("\(candidates[userChoice-1].lastname)")
                    .animation(.linear(duration: 1), value: 1)
                    .foregroundColor(Color("Bleu France"))
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .blur(radius: blur == true ? 15 : 0)
                    .onTapGesture {
                        withAnimation {
                            blur.toggle()
                        }
                    }
            }
            .padding(.bottom, 30)
            
            Button {
                withAnimation {
                    userHaveChoose = false
                }
            } label: {
                Text("Changer mon vote")
                    .foregroundColor(Color("Bleu France"))
            }

            
            Button("Valider mon vote", action: {
                ApiService().checkCode(phone: phoneNumber, code: verifCode, idCandidat: userChoice) { response in
                    if(response.result == true){
                        voteIsDone = true
                    }else{
                        voteIsDone = false
                    }
                }
            })
            .disabled(!isPhoneValid)
            .padding(10)
            .font(Font.custom("Marianne-Medium", size: 20))
            .background(Color("Bleu France"))
            .foregroundColor(Color("Primary"))
            
            
        }
    }
    
    private var voteChoice: some View {
        VStack{
            
            Text("Si vous souhaitez voter vous devez dans un premier temps vous enregistrer sur la page d'inscription. Si vous êtes déja inscris vous pouvez poursuivre sur cette page et enregistrer votre vote.")
                .padding()
                .font(Font.custom("Marianne-Regular", size: 18))
            
            
            Text("Sélectionnez votre choix")
                .padding()
                .font(Font.custom("Marianne-Medium", size: 20))
            
            Picker("Département de naissance", selection: $userChoice) {
                ForEach(self.candidates.shuffled(), id: \.self) { (candidate: Candidate) in
                    HStack{
                        Text(String(candidate.firstname))
                            .font(Font.custom("Marianne-Medium", size: 20))
                        Text(String(candidate.lastname))
                            .font(Font.custom("Marianne-Medium", size: 20))
                    }
                    .tag(candidate.id)
                    
                }
            }
            .pickerStyle(InlinePickerStyle())
            
            Button("Sauvegarder", action: {
                userHaveChoose = true
            })
            .disabled(!isPhoneValid)
            .padding(10)
            .font(Font.custom("Marianne-Medium", size: 20))
            .background(Color("Bleu France"))
            .foregroundColor(Color("Primary"))

            
        }
    }
    
    func textFieldValidatorPhone(value: String) -> Bool {
        let PHONE_REGEX = "^\\d{10}$"
        let phoneTest = NSPredicate(format: "SELF MATCHES %@", PHONE_REGEX)
        let result = phoneTest.evaluate(with: value)
        return result
    }
}

struct VotePage_Previews: PreviewProvider {
    static var previews: some View {
        VotePage()
    }
}
