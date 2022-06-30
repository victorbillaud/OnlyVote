const db = require('../db');

module.exports = {
    getAll : (req, res) => {
        db.query("SELECT * FROM Candidate", function(error, results, fields) {
            if (error) throw error;
            res.json(results);
            res.end();
        })
    }
}