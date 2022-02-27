const Lesson = require('../Models/Lesson')

class lessonsController {

    async createLesson(req, res) {
        console.log(req.body);
        try {
            const lesson = new Lesson({
                id: req.body.id,
                title: req.body.title,
                type: req.params.type,
                files: req.body.files
            })
            await lesson.save()
            return res.status(200).json({
                message: "lesson created successfully"
            })

        } catch (e) {
            console.log(e.message);
            res.status(400).json({
                error: e.message
            })
        }
    }
    async getLesson(req, res) {
        try {
            const lessons = await Lesson.findOne({
                id: req.params.id,
                type: req.params.type
            })
            return res.status(200).json(lessons)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async deleteLesson(req, res) {
        try {
            const lesson = await Lesson.deleteOne({
                id: req.params.id
            })
            return res.status(200).json({
                message: "lesson deleted successfully"
            })
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async getLessons(req, res) {
        try {
            const lessons = await Lesson.find({
                type: req.params.type
            })
            return res.status(200).json(lessons)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async getLesson(req, res) {
        try {
            const lessons = await Lesson.findOne({
                type: req.params.type,
                id: req.params.id
            })
            return res.status(200).json(lessons)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async getAllLessons(req, res) {
        try {
            const lessons = await Lesson.find({})
            return res.status(200).json(lessons)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
}

module.exports = new lessonsController()
