require("dotenv").config();
const { dateToNormal } = require("../Handlers/DateHandler");
const fetchDB = require('../Handlers/DataBaseHandler')

class testsController {

    async getResult(req, res, next) {
        try {
            const query = await fetchDB(`select * from test_result where id=${req.params.id}`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async getResults(req, res, next) {
        try {
            const query = await fetchDB(`select * from test_result`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async saveResult(req, res, next) {
        try {
            if (req.body.username) {
                const query = await fetchDB(`select * from user where username="${req.body.username}"`);
                console.log(111, query);
                req.body.user.firstName = query[0].firstname;
                req.body.user.lastName = query[0].lastname;
                req.body.user.classLetter = query[0].classname.slice(-1);
                req.body.user.classNumber = query[0].classname.slice(0, -1);
            }
            console.log(req.body);
            const query = await fetchDB(`insert into test_result (firstName, lastName, classNumber, classLetter, testName, testId, results, date, username, max) values ("${req.body.user.firstName}", '${req.body.user.lastName}', "${req.body.user.classNumber}", "${req.body.user.classLetter}", "${req.body.testName}", "${req.body.testId}", '${JSON.stringify(req.body.results)}', "${dateToNormal(req.body.date)}", "${req.body.username? req.body.username : ''}", "${req.body.max}");`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
}

module.exports = new testsController()