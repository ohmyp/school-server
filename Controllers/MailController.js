require("dotenv").config();
const nodemailer = require("nodemailer");
const mailHandler = require('../Handlers/MailHandler')

// TODO Запись в базу данных
class mailController {
    async sendmail(req, res) {
        const html = mailHandler.makeLetter(req.body)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        const info = await transporter.sendMail({
            from: `"Единая школа 511" <${process.env.SMTP_MAIL}>`, 
            to: process.env.MAIL_TO,
            subject: "Результаты анкетирования", 
            text: JSON.stringify(req.query),
            html,
        });

        console.log(`Message sent: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        res.status(200)
    }

}
module.exports = new mailController()