const fetchDB = require('../Handlers/DataBaseHandler')

class lessonsController {
    async createLesson(req, res, next) {
        try {
            const query = await fetchDB(`insert into lesson (title, type, files, tag) values ("${req.body.title}", '${req.body.type}', '${JSON.stringify(req.body.files)}', "${req.body.tag}");`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async getLesson(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson where id=${req.params.id} and type="${req.params.type}"`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async getLessons(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson where type="${req.params.type}"`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async getAllLessons(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async deleteLesson(req, res, next) {
        try {
            const query = await fetchDB(`delete from lesson where id=${req.params.id};`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async updateLesson(req, res, next) {
        try {
            const query = await fetchDB(`update lesson set title="${req.body.title}", files='${JSON.stringify(req.body.files)}', tag="${req.body.tag}" where id=${req.params.id} and type="${req.params.type}";`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
}

module.exports = new lessonsController()
