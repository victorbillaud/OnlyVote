const db = require('../../db');

function submitVote(phoneNumber, idCandidat){
    console.log(idCandidat)
    try {
        db.query("SELECT id FROM Users WHERE phoneNumber LIKE ?;", phoneNumber , function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                db.query("INSERT INTO Votes (id_user, id_candidate) VALUES (?, ?);", [results[0].id,  parseInt(idCandidat.toString())] , function(error, results, fields) {
                    if (error) throw error;
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = submitVote