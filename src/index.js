const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

// defining the Express app
const app = express();

//define Routes and Express
const {
    ROUTE_HOME
} = require("./routes");

// using bodyParser -> Need ??
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

// starting the server - WHERE??
app.listen(3001, () => {
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
