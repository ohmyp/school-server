const fetchDB = require("../Handlers/DataBaseHandler");

class MessageController {
    async send(req, res, next) {
        const { message, recipient } = req.body
        try {
            const q = "INSERT INTO oneschool.message (`sender`, `recipient`, `message`) VALUES ('" + req.user.username + "', '" + recipient + "', '" + message + "');"
            const result = await fetchDB(q)
            res.send({id: result.insertId})
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async get(req, res, next) {
        try {
            const q = "SELECT * FROM oneschool.message WHERE recipient='" + req.params.username + "';"
            const result = await fetchDB(q)
            res.send(result)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async read(req, res, next) {
        try {
            const q = "update oneschool.message set watched = 1 where recipient='" + req.user.username + "';"
            const result = await fetchDB(q)
            res.send('ok')
        } catch (e) {
            console.log(e)
            res.send(e)
        }

    }
}

module.exports = new MessageController()
