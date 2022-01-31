const Lesson = require('../models/Lesson')

class lessonsController {

    async createLesson(req, res) {
        console.log(req.query, req.params.type);
        const files = null
        try {
            const lesson = new Lesson({
                id: req.query.id,
                title: req.query.title,
                image: req.query.image,
                type: req.params.type
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