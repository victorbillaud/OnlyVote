const db = require('../db');
const axios  = require('axios');


module.exports = {
    verifInDatabase: (req,res,next) => {
        db.query("SELECT * FROM Users WHERE num_secu LIKE ? AND phoneNumber = ? ;", [req.body.socialNumber,  req.body.phoneNumber] , function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.send({result: false, message: "Vous vous êtes déjà enregistré auparavant"});
            }else next()
        })
    },
    verifUserVote: (req,res,next) => {
        db.query("SELECT * FROM Votes JOIN Users U on Votes.id_user = U.id WHERE U.phoneNumber = ?", req.headers.phone , function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log("User already voted")
                res.send({result: false, message: "Vous avez déja voté"});
            }else next()
        })
    },
    register: (req, res, next) => {
        const userData = req.body;
        const socialNumber = userData.socialNumber;

        console.dir(userData)

        numSexe = socialNumber.slice(0, 1);
        numAnnee = socialNumber.slice(1,3);
        numMois = socialNumber.slice(3, 5);
        numINSEE = socialNumber.slice(5, 10);
        cle = socialNumber.slice(13, 15);
        nir = socialNumber.slice(0, 13);

        if(cle == (97 - nir % 97)){
            verifInseeCode().then(result => {
                if((result.data.COM && result.data.COM.toString() == numINSEE) || numINSEE.slice(0,2) == "75"){
                    if (verifGender(userData.gender) == numSexe && verifBirthDate(userData.birthDate) && verifBirthAge(userData.birthDate)){

                        // CHECK USER OK
                        // ENREGISTREMENT DANS LA DB OK
                        console.log( userData.birthDate)
                        db.query("INSERT INTO Users (num_secu, dateOfBirth, gender, stateOfBirth, townOfBirth, phoneNumber, email, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", 
                            [userData.socialNumber, convertDateFormat(), userData.gender, userData.birthDepartment, userData.birthTown, userData.phoneNumber, userData.email, userData.firstname, userData.lastname], 
                            function(error, results, fields) {
                                console.log(results)
                                if (error) throw error;
                            }
                        )


                        res.send({result: true, message: "Vous êtes bien enregistré"})
                    } else res.send({result: false, message: "Vos informations sont invalides"})
                } else res.send({result: false, message: "Vos informations sont invalides"})
            })
        }else{
            res.send({result: false, message: "Vos informations sont invalides"})
        }

        // verificaton du genre
        function verifGender(){
            return sexe = userData.gender == 'homme' ? 1 : 2; 
        }

        // verification de la date de naissance
        function verifBirthDate(){
            var date = new Date(userData.birthDate * 1000);
            // Hours part from the timestamp
            const year = Number(date.getFullYear().toString().slice(-2));
            const month = date.getMonth();

            if(year == numAnnee && month + 1 == numMois){
                return true;
            }
            return false;
        }

        function convertDateFormat(){
            const date = new Date(userData.birthDate * 1000).toISOString().slice(0, 19).replace('T', ' ');;
            return date
        }

        // verification de l'age
        function verifBirthAge(){
            var date = new Date(userData.birthDate * 1000);
            return (new Date(new Date() - date).getYear() - 70) >= 18 ? true : false;
        }

        // verification du code insee de la commune
        function verifInseeCode(){
            var INSEE = null;
            const response = getInsee({
                com : userData.birthTown,
                dep : userData.birthDepartment
            });

            return response

            function getInsee(data) {
                return axios.post('https://onlyvote.victorbillaud.fr/insee', {
                    data
                }) 
            }
        }
    }
}