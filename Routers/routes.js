const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const lessonsController = require('../Controllers/LessonControllers')
const downloadController = require('../Controllers/DownloadControllers')
const testsController = require('../Controllers/TestsController')
const authController = require('../Controllers/AuthController')
const authMiddlewares = require('../Middlewares/AuthMiddleware')


router.get('/posts', postsController.getPosts)
router.post('/posts/create', authMiddlewares.authenticateJWT, postsController.createPost)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', authMiddlewares.authenticateJWT, postsController.deletePost)
router.post('/posts/:id/update', authMiddlewares.authenticateJWT, postsController.updatePost)

router.get('/profession/:type', lessonsController.getLessons)
router.get('/profession/:type/:id', lessonsController.getLesson)
router.post('/profession/:type/create', authMiddlewares.authenticateJWT, lessonsController.createLesson)
router.get('/profession', lessonsController.getAllLessons)
router.get('/profession/:type/:id/delete', authMiddlewares.authenticateJWT, lessonsController.deleteLesson)
router.post('/profession/:type/:id/update', authMiddlewares.authenticateJWT, lessonsController.updateLesson)

router.get('/download/:filename', downloadController.download)
router.post('/upload/:path', downloadController.upload)
router.get('/files/:category', downloadController.getFiles)

router.post('/auth/register', authMiddlewares.authenticateJWT, authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/users', authMiddlewares.authenticateJWT, authController.getUsers)
// authMiddlewares.authenticateJWT
router.post('/results', testsController.sendMail)
router.get('/results', authMiddlewares.authenticateJWT, testsController.getAllResults)
router.get('/results/:id', authMiddlewares.authenticateJWT, testsController.getResults)

module.exports = router