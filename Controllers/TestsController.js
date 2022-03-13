require("dotenv").config();
const nodemailer = require("nodemailer");
const { dateToNormal } = require("../Handlers/DateHandler");
const mailHandler = require('../Handlers/MailHandler')
const TestResult = require('../Models/TestResult')

class testsController {
    async getResults(req, res){
        try {
            const results = await TestResult.find({id:req.params.id})
            res.send(results)
        } catch (e) {
            console.log(e);
            res.status(400)
        }
    }
    async getAllResults(req, res){
        try {
            const results = await TestResult.find({})
            res.send(results)
        } catch (e) {
            console.log(e);
            res.status(400)
        }
    }
    async sendMail(req, res) {
        // const html = mailHandler.makeLetter(req.body)
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: "oneschool511@gmail.com",
        //         pass: "ifmoCRETA2133mari",
        //     },
        // })

        // const info = await transporter.sendMail({
        //     from: `"Единая школа 511" <oneschool511@gmail.com>`, 
        //     to: "sherbaken0875@icloud.com",
        //     subject: "Результаты анкетирования", 
        //     text: JSON.stringify(req.query),
        //     html,
        // });
        try {
            const testResult = new TestResult({
                id: req.body.id,
                name: req.body.name,
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                classNumber: req.body.user.classNumber,
                classLetter: req.body.user.classLetter,
                results: req.body.results,
                date: dateToNormal(req.body.date)
            })
            await testResult.save()
            res.send("ok").status(200)
        } catch (e) {
            console.log(e);
        }
    
    }
}
module.exports = new testsController()
