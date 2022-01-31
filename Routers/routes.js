const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const lessonsController = require('../Controllers/LessonControllers')
const downloadController = require('../Controllers/DownloadControllers')
const mailController = require('../Controllers/MailController')

router.get('/posts', postsController.getPosts)
router.post('/posts/create', postsController.createPost)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', postsController.deletePost)

router.get('/profession/:type', lessonsController.getLessons)
router.post('/profession/:type', lessonsController.createLesson)
router.get('/profession', lessonsController.getAllLessons)
router.get('/profession/:type/:id/delete', lessonsController.deleteLesson)

router.get('/download/:filename', downloadController.download)
router.post('/upload/:path', downloadController.upload)

router.post('/results', mailController.sendmail)

module.exports = router