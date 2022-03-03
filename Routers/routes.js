const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const lessonsController = require('../Controllers/LessonControllers')
const downloadController = require('../Controllers/DownloadControllers')
const mailController = require('../Controllers/MailController')
const authController = require('../Controllers/AuthController')
const authMiddlewares = require('../Middlewares/AuthMiddleware')


router.get('/posts', postsController.getPosts)
router.post('/posts/create', postsController.createPost)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', postsController.deletePost)
router.post('/posts/:id/update', postsController.updatePost)

router.get('/profession/:type', authMiddlewares.authenticateJWT,lessonsController.getLessons)
router.get('/profession/:type/:id', lessonsController.getLesson)
router.post('/profession/:type/create', lessonsController.createLesson)
router.get('/profession', lessonsController.getAllLessons)
router.get('/profession/:type/:id/delete', lessonsController.deleteLesson)
router.post('/profession/:type/:id/update', lessonsController.updateLesson)

router.get('/download/:filename', downloadController.download)
router.post('/upload/:path', downloadController.upload)
router.get('/files/:category', downloadController.getFiles)

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/users', authController.getUsers)
// authMiddlewares.authenticateJWT
router.post('/results', mailController.sendmail)

module.exports = router