const logger = require('../logger')
const mysql = require("mysql2");

function fetchDB(query, res){
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "oneschool",
        password: "ifmoCRETA2133mari!"
    })
    connection.connect((err) => {
        if (err) {
            return console.error("Ошибка: " + err.message);
        } else {
            ;
        }
    });
    connection.query(query,
    (err, results, fields) => {
        if (err) console.log(err)
        console.log(results)
        res.json(results)
    });
}
class lessonsController {
    createLesson(req, res, next) {
        fetchDB(`insert into lesson (title, type, files, tag) values ("${req.body.title}", '${req.body.type}', '${JSON.stringify(req.body.files)}', "${req.body.tag}");`, res)
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
    getLesson(req, res, next) {
        fetchDB(`select * from lesson where id=${req.params.id} and type="${req.params.type}"`, res)
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
    getLessons(req, res, next) {
        fetchDB(`select * from lesson where type="${req.params.type}"`, res)
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
    getAllLessons(req, res, next) {
        fetchDB(`select * from lesson`, res)
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
    deleteLesson(req, res, next) {
        fetchDB(`delete from lesson where id=${req.params.id};`, res)
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
    updateLesson(req, res, next) {
        fetchDB(`update lesson set title="${req.body.title}", files='${JSON.stringify(req.body.files)}', tag="${req.body.tag}" where id=${req.params.id} and type="${req.params.type}";`, res)
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
