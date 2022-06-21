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

// using bodyParser -> Need ??
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

app.get(ROUTE_DEPARTMENT, department);
app.get(ROUTE_CANDIDAT, getCandidate);
app.get(ROUTE_RESULTAT, getVotes)

// starting the server - WHERE??
app.listen(process.env.PORT, () => {
    console.log('listening on ???');
});

// define connection to MySQL database
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})

// Fonctions express

function department(request, response, next){
    connection.query("SELECT DEP, NCC FROM commune2021;", function(error, results, fields) {
        if (error) throw error;

        response.json(results);
        response.end();
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