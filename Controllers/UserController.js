const fetchDB = require("../Handlers/DataBaseHandler");

class UserController {
    async getByUsername(req, res, next) {
        try {
            const q = "SELECT * FROM oneschool.user WHERE username='" + req.params.username + "';"
            const result = await fetchDB(q)
            res.send(result)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

}
module.exports = new UserController()