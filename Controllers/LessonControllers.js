const logger = require('../logger')
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
    // async createLesson(req, res) {
    //     try {
    //         const lesson = new Lesson({
    //             id: req.body.id,
    //             title: req.body.title,
    //             type: req.params.type,
    //             files: req.body.files
    //         })
    //         await lesson.save()
    //         logger.admin(req)
    //         return res.status(200).json({
    //             message: "lesson created successfully"
    //         })
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e.message);
    //         res.status(400).json({
    //             error: e.message
    //         })
    //     }
    // }
    async getLesson(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson where id=${req.params.id} and type="${req.params.type}"`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async getLesson(req, res) {
    //     try {
    //         const lessons = await Lesson.findOne({
    //             id: req.params.id,
    //             type: req.params.type
    //         })
    //         logger.user(req)
    //         return res.status(200).json(lessons)
    //     } catch (e) {
    //         logger.userError(req)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    async getLessons(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson where type="${req.params.type}"`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async getLessons(req, res) {
    //     try {
    //         const lessons = await Lesson.find({
    //             type: req.params.type
    //         })
    //         return res.status(200).json(lessons)
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    async getAllLessons(req, res, next) {
        try {
            const query = await fetchDB(`select * from lesson`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async getAllLessons(req, res) {
    //     try {
    //         const lessons = await Lesson.find({})
    //         return res.status(200).json(lessons)
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    async deleteLesson(req, res, next) {
        try {
            const query = await fetchDB(`delete from lesson where id=${req.params.id};`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async deleteLesson(req, res) {
    //     try {
    //         const lesson = await Lesson.deleteOne({
    //             id: req.params.id
    //         })
    //         logger.admin(req)
    //         return res.status(200).json({
    //             message: "lesson deleted successfully"
    //         })
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    async updateLesson(req, res, next) {
        try {
            const query = await fetchDB(`update lesson set title="${req.body.title}", files='${JSON.stringify(req.body.files)}', tag="${req.body.tag}" where id=${req.params.id} and type="${req.params.type}";`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    // async updateLesson(req, res) {
    //     try {
    //         const update = await Lesson.findOneAndUpdate({
    //                 type: req.params.type,
    //                 id: req.params.id
    //             }, {
    //                 id: req.body.id,
    //                 title: req.body.title,
    //                 type: req.params.type,
    //                 files: req.body.files
    //             }, {
    //                 new: true
    //             }
    //         )
    //         logger.admin(req)
    //         return res.status(200).json(update)
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
}

module.exports = new lessonsController()
