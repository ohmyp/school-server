require("dotenv").config();
const { dateToNormal } = require("../Handlers/DateHandler");
const logger = require("../logger");
const TestResult = require('../Models/TestResult')
const fetchDB = require('../Handlers/DataBaseHandler')

class testsController {
    // async getResult(req, res) {
    //     try {
    //         const results = await TestResult.find({
    //             id: req.params.id
    //         })
    //         logger.admin(req)
    //         res.send(results)
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(400)
    //     }
    // }
    async getResult(req, res, next) {
        try {
            const query = await fetchDB(`select * from test_result where id=${req.params.id}`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async getResults(req, res) {
    //     try {
    //         const results = await TestResult.find({})
    //         logger.admin(req)
    //         res.send(results)
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(400)
    //     }
    // }
    async getResults(req, res, next) {
        try {
            const query = await fetchDB(`select * from test_result`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async saveResult(req, res) {
    //     try {
    //         const testResult = new TestResult({
    //             id: req.body.id,
    //             name: req.body.name,
    //             firstName: req.body.user.firstName,
    //             lastName: req.body.user.lastName,
    //             classNumber: req.body.user.classNumber,
    //             classLetter: req.body.user.classLetter,
    //             results: req.body.results,
    //             date: dateToNormal(req.body.date)
    //         })
    //         await testResult.save()
    //         res.send("ok").status(200)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    async saveResult(req, res, next) {
        try {
            const query = await fetchDB(`insert into test_result (firstName, lastName, classNumber, classLetter, testName, testId, results, date) values ("${req.body.user.firstName}", '${req.body.user.lastName}', "${req.body.user.classNumber}", "${req.body.user.classLetter}", "${req.body.testName}", "${req.body.testId}", '${JSON.stringify(req.body.results)}', "${dateToNormal(req.body.date)}");`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
}
module.exports = new testsController()