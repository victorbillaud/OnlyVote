require('dotenv').config();
const client = require('./twilio')
const submitVote = require('../vote/vote')

module.exports = {
    submit : (req, res) => {
        console.log(req.headers)
        const phone = '+33' + req.headers.phone.substr(1)
        client.verify.services('VAa197e2db245596ea137271f896e893aa')
                 .verifications
                 .create({to: phone, channel: 'sms'})
                 .then(verification => {
                    console.log(verification.sid)
                    res.json({result: true, message: "Message sended"})
                 });
    },
    check : (req, res) => {
        console.log(req.headers)
        const phone = '+33' + req.headers.phone.substr(1)
        client.verify.services('VAa197e2db245596ea137271f896e893aa')
        .verificationChecks
        .create({to: phone, code: req.headers.code})
        .then(verification_check => {
            console.log(verification_check.status)
            if(verification_check.status == 'approved'){
                submitVote(req.headers.phone, req.headers.idcandidat)
                res.json({result: true, message: "Vote is done"})
            }else{
                res.json({result: false, message: "Le code est invalide"})
            }
            
        });
    }
}