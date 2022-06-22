//
//  AccountPage.swift
//  OnlyVote
//
//  Created by Victor Billaud on 14/06/2022.
//

import SwiftUI

struct AccountPage: View {
    
    @State var towns: [Town] = []
    
    init() {
        UISegmentedControl.appearance().selectedSegmentTintColor = UIColor(Color("Bleu France"))
        UISegmentedControl.appearance().setTitleTextAttributes([.foregroundColor: UIColor(Color("Primary"))], for: .selected)
        UISegmentedControl.appearance().setTitleTextAttributes([.foregroundColor: UIColor(.black)], for: .normal)
        
    }
    
    
    
    @State private var firstname = ""
    @State private var lastname = ""
    @State private var gender: Gender = .male
    @State private var birthDate = Date()
    @State private var birthDepartment = 0
    @State private var birthTown = ""
    @State private var email = ""
    @State private var isEmailValid = true
    @State private var phoneNumber = ""
    @State private var isPhoneValid = true
    @State private var socialNumber = ""
    @State private var isSocialNumberValid = true
    
    @State private var showingBirthSelection = false
    
    
    var body: some View {
        VStack {
            
            // TITLE
            Text("S'enregistrer")
                .bold()
                .font(.largeTitle)
                .padding(0.5)
            
            
            // GENDER
            Picker("Sexe", selection: $gender) {
                Text("Homme")
                    .tag(Gender.male)
                Text("Femme")
                    .tag(Gender.female)
            }
            .pickerStyle(.segmented)
            .frame(width: 300, height: 50, alignment: .center)
            
            // FIRSTNAME AND LASTNAME
            HStack{
                Image(systemName: "person")
                    .foregroundColor(Color("Bleu France"))
                Divider()
                    .foregroundColor(Color("Bleu France"))
                    .frame(width: 5, height: 30)
                HStack{
                    TextField("Prénom", text: $firstname)
                        .padding(.leading, 30)
                        .frame(width: 130, height: 50, alignment: .center)
                    Divider()
                        .foregroundColor(Color("Bleu France"))
                        .frame(height: 50)
                    SecureField("Nom", text: $lastname)
                        .padding()
                        .frame(width: 130, height: 50, alignment: .center)
                }
                .frame(width: 260, height: 50, alignment: .center)
                .background(Color.black.opacity(0.03))
                .cornerRadius(10)
            }
            .padding()
            
            
            HStack{
                if(self.birthTown != "" && self.birthDepartment != 0 ){
                    Text(self.gender == Gender.male ? "Né le": "Née le")
                        .font(Font.custom("Marianne-Medium", size: 18))
                    Text(Formatter.weekDay.string(from: self.birthDate))
                        .font(Font.custom("Marianne-Medium", size: 18))
                    
                    Text("à")
                        .font(Font.custom("Marianne-Medium", size: 18))
                    Text(String(self.birthTown))
                        .font(Font.custom("Marianne-Medium", size: 18))
                }else{
                    Text("Date et lieu de naissance")
                        .font(Font.custom("Marianne-Medium", size: 18))
                }
            }
            .onTapGesture {
                showingBirthSelection.toggle()
            }
            
            
            HStack{
                Image(systemName: "at")
                    .foregroundColor(Color("Bleu France"))
                Divider()
                    .foregroundColor(Color("Bleu France"))
                    .frame(height: 30)
                TextField("Email", text: $email, onEditingChanged: { (isChanged) in
                    if !isChanged {
                        if self.textFieldValidatorEmail(self.email) {
                            self.isEmailValid = true
                        } else {
                            self.isEmailValid = false
                        }
                    }
                })
                .disableAutocorrection(true)
                .autocapitalization(.none)
                .padding()
                .frame(width: 260, height: 50, alignment: .center)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(.red, lineWidth: self.isEmailValid ? 0 : 2)
                )
                .cornerRadius(10)
                .background(Color.black.opacity(0.03))
                .cornerRadius(10)
            }
            .padding()
            
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
            
            HStack{
                Image(systemName: "number")
                    .foregroundColor(Color("Bleu France"))
                Divider()
                    .foregroundColor(Color("Bleu France"))
                    .frame(height: 30)
                TextField("Numéro de sécurité sociale", text: $socialNumber, onEditingChanged: { (isChanged) in
                    if !isChanged {
                        if self.textFieldValidatorSocialNumber(value: self.socialNumber) {
                            self.isSocialNumberValid = true
                        } else {
                            self.isSocialNumberValid = false
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
                            .stroke(.red, lineWidth: self.isSocialNumberValid ? 0 : 2)
                    )
                    .cornerRadius(10)
                    .background(Color.black.opacity(0.03))
                    .cornerRadius(10)
            }
            .padding()
            
            Button("Sauvegarder", action: {
                ApiService().register(
                    firstname: firstname,
                    lastname: lastname,
                    gender: gender,
                    birthDate: birthDate,
                    birthDepartment: birthDepartment,
                    birthTown: birthTown,
                    email: email,
                    phoneNumber: phoneNumber,
                    socialNumber: socialNumber
                ) { response in
                    print(response)
                }
            })
            .disabled(
                !(firstname != "" &&
                  lastname != "" &&
                  birthDepartment != 0 &&
                  birthTown != "" &&
                  email != "" &&
                  isEmailValid != false &&
                  phoneNumber != "" &&
                  socialNumber != "")
            )
            .padding(10)
            .font(Font.custom("Marianne-Medium", size: 20))
            .background(Color("Bleu France"))
            .foregroundColor(Color("Primary"))
            
            
        }
        .navigationBarHidden(true)
        .sheet(isPresented: $showingBirthSelection) {
            VStack{
                VStack{
                    Text("Date de naissance")
                        .padding()
                        .font(Font.custom("Marianne-Medium", size: 20))
                        .frame(width: UIScreen.main.bounds.width - 40, alignment: .leading)
                    
                    
                    HStack{
                        Spacer()
                        DatePicker.init(selection: $birthDate, displayedComponents: .date, label: {
                            EmptyView()
                        })
                        .labelsHidden().datePickerStyle(WheelDatePickerStyle())
                        Spacer()
                    }
                }
                
                
                Text("Departement de naissance")
                    .padding()
                    .font(Font.custom("Marianne-Medium", size: 20))
                    .frame(width: UIScreen.main.bounds.width - 40, alignment: .leading)
                
                Picker("Département de naissance", selection: $birthDepartment) {
                    ForEach(1...95, id: \.self) { i in
                        Text(String(i))
                            .tag(i)
                            .font(Font.custom("Marianne-Medium", size: 20))
                    }
                    Text(String(971))
                        .tag(971)
                        .font(Font.custom("Marianne-Medium", size: 20))
                    Text(String(974))
                        .tag(974)
                        .font(Font.custom("Marianne-Medium", size: 20))
                    Text(String(976))
                        .tag(976)
                        .font(Font.custom("Marianne-Medium", size: 20))
                }
                .pickerStyle(InlinePickerStyle())
                .frame(width: UIScreen.main.bounds.width - 40, height: 100, alignment: .leading)
                .foregroundColor(.black)
                .cornerRadius(10)
                .onChange(of: birthDepartment) { value in
                    ApiService().getTowns(department: value) { places in
                        self.towns = places;
                        //print(self.towns)
                    }
                }
                
                List{
                    ForEach(self.towns, id:\.self) { department in
                        Text(department.NCCENR)
                            .tag(department.id)
                            .onTapGesture {
                                birthTown = department.NCCENR
                                showingBirthSelection.toggle()
                            }
                    }
                    .listRowSeparator(.hidden)
                    .listRowBackground(Color.clear)
                }
                .listStyle(.inset)
                .padding()
            }
            
            
            
        }
        
    }
    
    func textFieldValidatorEmail(_ string: String) -> Bool {
        if string.count > 100 {
            return false
        }
        let emailFormat = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}" // short format
        let emailPredicate = NSPredicate(format:"SELF MATCHES %@", emailFormat)
        return emailPredicate.evaluate(with: string)
    }
    
    func textFieldValidatorPhone(value: String) -> Bool {
        let PHONE_REGEX = "^\\d{10}$"
        let phoneTest = NSPredicate(format: "SELF MATCHES %@", PHONE_REGEX)
        let result = phoneTest.evaluate(with: value)
        return result
    }
    
    func textFieldValidatorSocialNumber(value: String) -> Bool {
        let PHONE_REGEX = "^\\d{15}$"
        let phoneTest = NSPredicate(format: "SELF MATCHES %@", PHONE_REGEX)
        let result = phoneTest.evaluate(with: value)
        return result
    }
    
}

extension Formatter {
    static let weekDay: DateFormatter = {
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .none
        
        // and for standalone local day of week use ccc instead of E
        dateFormatter.locale = Locale(identifier: "fr_FR")
        return dateFormatter
    }()
}

struct AccountPage_Previews: PreviewProvider {
    static var previews: some View {
        AccountPage()
    }
}
