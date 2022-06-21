const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

// defining the Express app
const app = express();

//define Routes and Express
const {
    ROUTE_FORM,
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


// app.use(express.json());
// app.use(cors())
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

app.post(ROUTE_DEPARTMENT, department);
app.get(ROUTE_CANDIDAT, getCandidate);
app.get(ROUTE_RESULTAT, getVotes)
app.post(ROUTE_FORM, form)

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
    connection.query("SELECT id, DEP, NCCENR FROM commune2021 WHERE DEP NOT LIKE 'null' AND DEP = ?;", req.body.department , function(error, results, fields) {
        if (error) throw error;
        //console.log(fields)
        res.json(results);
        console.log(JSON.stringify(results))
        res.end();
    })
    
}


function form(req, res, next) {
    console.log(req.body)
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