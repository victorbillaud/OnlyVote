const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// -------- IMPORT LIB FUNCTIONS --------- //

const smsServices = require('../lib/sms/smsServices')
const department = require('../lib/department')
const candidate = require('../lib/candidate')
const user = require('../lib/user')

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
    ROUTE_GET_INSEE,
    ROUTE_CODE,
    ROUTE_CHECK
} = require("./routes");

app.use(express.urlencoded({ extended: false }));

// using bodyParser
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.post(ROUTE_DEPARTMENT, department.getTowns);
app.get(ROUTE_CANDIDAT, candidate.getAll);
app.post(ROUTE_REGISTER, user.verifInDatabase, user.register);
app.post(ROUTE_GET_INSEE, department.getInseeCode);
app.get(ROUTE_CODE, user.verifUserVote, smsServices.submit);
app.get(ROUTE_CHECK, smsServices.check);

// code de verification
app.listen(process.env.PORT, () => {
    console.log('listening on',process.env.PORT);
});