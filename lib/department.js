const db = require('../db');

module.exports = {
    getTowns : (req, res) => {
        console.log(req.body)
        const dep = req.body.department ? req.body.department : req.body.data.department.dep
        db.query("SELECT id, dep, nccenr FROM commune2021 WHERE dep NOT LIKE 'null' AND dep = ?;", dep, function(error, results, fields) {
            if (error) throw error;
            //console.log(fields)
            res.json(results);
            //console.log(JSON.stringify(results))
            res.end();
        })
    },
    getInseeCode : (req,res) => {
        db.query("SELECT COM FROM commune2021 WHERE NCCENR LIKE ? AND DEP = ? ;", [req.body.data.com,  req.body.data.dep] , function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results[0])
            }else res.send(false);
        })
    }
}