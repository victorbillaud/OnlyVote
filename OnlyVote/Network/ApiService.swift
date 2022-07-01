//
//  ApiService.swift
//  OnlyVote
//
//  Created by Victor Billaud on 20/06/2022.
//

import Foundation

class ApiService {
    
    private var dataTask: URLSessionDataTask?
    
    func sendCode(phone : String, completion:@escaping (TemplateResponseExpress) -> ()) {
        guard let url = URL(string: "https://onlyvote.victorbillaud.fr/code") else {
            print("Invalid url...")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue(phone, forHTTPHeaderField: "phone")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let result = try! JSONDecoder().decode(TemplateResponseExpress.self, from: data!)
            //print(places)
            DispatchQueue.main.async {
                completion(result)
            }
        }.resume()

    }
    
    func checkCode(phone : String, code : String, idCandidat: Int, completion:@escaping (TemplateResponseExpress) -> ()) {
        guard let url = URL(string: "https://onlyvote.victorbillaud.fr/check") else {
            print("Invalid url...")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue(phone, forHTTPHeaderField: "phone")
        request.addValue(code, forHTTPHeaderField: "code")
        request.addValue(String(idCandidat), forHTTPHeaderField: "idCandidat")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let result = try! JSONDecoder().decode(TemplateResponseExpress.self, from: data!)
            //print(places)
            DispatchQueue.main.async {
                completion(result)
            }
        }.resume()

    }
    
    
    func getCandidate(completion:@escaping ([Candidate]) -> ()) {
        guard let url = URL(string: "https://onlyvote.victorbillaud.fr/candidat") else {
            print("Invalid url...")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let result = try! JSONDecoder().decode([Candidate].self, from: data!)
            //print(places)
            DispatchQueue.main.async {
                completion(result)
            }
        }.resume()

    }
    
    func getTowns(department : Int, completion:@escaping ([Town]) -> ()) {
        guard let url = URL(string: "https://onlyvote.victorbillaud.fr/department") else {
            print("Invalid url...")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["department" : department]
        guard let httpBody2 = try? JSONSerialization.data(withJSONObject: body, options: []) else {
            return
        }
        
        // MARK: Set httpBody
        request.httpBody = httpBody2
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let result = try! JSONDecoder().decode([Town].self, from: data!)
            //print(places)
            DispatchQueue.main.async {
                completion(result)
            }
        }.resume()

    }
    
    func register(
        firstname : String,
        lastname : String,
        gender : Gender,
        birthDate : Date,
        birthDepartment : Int,
        birthTown : String,
        email: String,
        phoneNumber : String,
        socialNumber: String,
        completion:@escaping (TemplateResponseExpress) -> ()
    ) {
        guard let url = URL(string: "https://onlyvote.victorbillaud.fr/register") else {
            print("Invalid url...")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let birthDateTimeStamp = birthDate.timeIntervalSince1970
        
        let body = [
            "firstname" : firstname,
            "lastname" : lastname,
            "gender" : gender.rawValue,
            "birthDate" : birthDateTimeStamp,
            "birthDepartment" : birthDepartment,
            "birthTown" : birthTown,
            "email": email,
            "phoneNumber" : phoneNumber,
            "socialNumber" : socialNumber
        ] as [String : Any]
        guard let httpBody2 = try? JSONSerialization.data(withJSONObject: body, options: []) else {
            return
        }
        
        // MARK: Set httpBody
        request.httpBody = httpBody2
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            let result = try! JSONDecoder().decode(TemplateResponseExpress.self, from: data!)
            //print(places)
            DispatchQueue.main.async {
                completion(result)
            }
        }.resume()

    }
    
}
