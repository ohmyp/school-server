const fetchDB = require("../Handlers/DataBaseHandler");

class PortfolioController{
    async addPortfolio(req, res, next) {
        try {
            const candidate = await fetchDB(`select * from portfolio where username="${req.body.username}";`)
            console.log(111, candidate[0])
            if (candidate.length === 0){
                const query = await fetchDB(`insert into portfolio (username, files) values ("${req.body.username}", '["${req.body.file}"]');`)
                console.log('created')
                res.status(200)
            } else {
                const newFiles = [...candidate[0].files, req.body.file]
                console.log(newFiles)
                const query = await fetchDB(`update portfolio set files='${JSON.stringify(newFiles)}' where (username='${req.body.username}');`)
                console.log('updated')
                res.status(200)
            }

        } catch (e) {
            console.log(e)
        }
    }
    async getPortfolio(req, res, next) {
        try {
            const query = await fetchDB(`select * from portfolio where username="${req.params.username}";`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

}

module.exports = new PortfolioController()