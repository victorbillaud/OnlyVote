const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const axios  = require('axios');
const moment = require('moment')

require('dotenv').config();
//{path:'../.env'}

// defining the Express app
const app = express();

//define Routes and Express
const {
    ROUTE_REGISTER,
    ROUTE_VOTE,
    ROUTE_DEPARTMENT,
    ROUTE_CANDIDAT,
    ROUTE_RESULTAT,
    ROUTE_GET_INSEE
} = require("./routes");

// ???
app.use(express.urlencoded({ extended: false }));

// using bodyParser -> Need ??
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());


/*
    SMS
*/

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+13512229611',
//      to: '+33782063054'
//    })
//   .then(message => console.log(message.sid));



// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

app.post(ROUTE_DEPARTMENT, department);
app.get(ROUTE_CANDIDAT, getCandidate);
app.get(ROUTE_RESULTAT, getVotes)
app.post(ROUTE_REGISTER, register)
app.post(ROUTE_GET_INSEE, getInseeCode)

// define connection to MySQL database
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER ? process.env.USER : "onlyvote" ,
    password: process.env.PASSWORD ? process.env.PASSWORD : "onlyvote",
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})

// Fonctions express

function department(req, res){
    console.log(req.body)
    const dep = req.body.department ? req.body.department : req.body.data.department.dep
    connection.query("SELECT id, dep, nccenr FROM commune2021 WHERE dep NOT LIKE 'null' AND dep = ?;", dep, function(error, results, fields) {
        if (error) throw error;
        //console.log(fields)
        res.json(results);
        //console.log(JSON.stringify(results))
        res.end();
    })
    
}


function form(req, res, next) {
    console.log(req.body)
    res.json({
        "response": "user registered"
    })
}

function getCandidate(req, res, next) {
    connection.query("SELECT * FROM Candidate", function(error, results, fields) {
        if (error) throw error;

        res.json(results);
        res.end();
    })
}

function getVotes(res, res, next) {
    connection.query("SELECT * FROM Votes", function(error, results, fields) {
        if (error) throw error;

        res.json(results);
        res.end();
    })
}

// check user data + carte vitale
function register(req, res, next){

    // IL FAUT RESPECTER LE MODELE DE REPONSE

    // {result: Bool, message: String}



    const userData = req.body;
    const socialNumber = userData.socialNumber;

    console.log(userData)

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
                    connection.query("INSERT INTO Users (num_secu, dateOfBirth, gender, stateOfBirth, townOfBirth, phoneNumber, email, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", 
                        [userData.socialNumber, convertDateFormat(), userData.gender, userData.birthDepartment, userData.birthTown, userData.phoneNumber, userData.email, userData.firstname, userData.lastname], 
                        function(error, results, fields) {
                            console.log(results)
                            if (error) throw error;
                        }
                    )


                    res.send({result: true, message: "User Registred"})
                } else res.send({result: false, message: "Info Invalid"})
            } else res.send({result: false, message: "Numero INSEE invalid"})
        })
    }else{
        res.send({result: false, message: "Social card number invalid"})
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

function getInseeCode(req, res){
    connection.query("SELECT COM FROM commune2021 WHERE NCCENR LIKE ? AND DEP = ? ;", [req.body.data.com,  req.body.data.dep] , function(error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results[0])
        }else res.send(false);
    })
}

// code de verification
app.listen(process.env.PORT, () => {
    console.log('listening on',process.env.PORT);
});