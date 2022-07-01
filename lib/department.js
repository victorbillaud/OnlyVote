const db = require('../db');

module.exports = {
    getTowns : (req, res) => {
        console.log(req.body)
        const dep = req.body.department ? req.body.department : req.body.data.department
        db.query("SELECT id, dep, nccenr FROM commune2021 WHERE dep NOT LIKE 'null' AND dep = ?;", dep, function(error, results, fields) {
            if (error) throw error;
            //console.log(fields)
            res.json(results);
            //console.log(JSON.stringify(results))
            res.end();
        })
    },
    getInseeCode : (req,res) => {
        const requestData = req.body.data ? req.body.data : req.body
        db.query("SELECT COM FROM commune2021 WHERE NCCENR LIKE ? AND DEP = ? ;", [requestData.com,  requestData.dep] , function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results[0])
            }else res.send(false);
        })
    }
}