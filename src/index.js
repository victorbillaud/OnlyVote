const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config({path:'../.env'});

// defining the Express app
const app = express();

//define Routes and Express
const {
    ROUTE_REGISTER,
    ROUTE_VOTE,
    ROUTE_DEPARTMENT,
    ROUTE_CANDIDAT,
    ROUTE_RESULTAT
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
app.post(ROUTE_REGISTER, form)

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
    //console.log(req.body)
    connection.query("SELECT id, DEP, NCCENR FROM commune2021 WHERE DEP NOT LIKE 'null' AND DEP = ?;", req.body.department , function(error, results, fields) {
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
        "response": "uses registered"
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

// code de verification
app.listen(process.env.PORT, () => {
    console.log('listening on',process.env.PORT);
});