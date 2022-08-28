const { Router } = require('express')
const router = Router()
const postsController = require('../Controllers/PostController')
const lessonsController = require('../Controllers/LessonController')
const downloadController = require('../Controllers/DownloadController')
const testsController = require('../Controllers/TestsController')
const authController = require('../Controllers/AuthController')
const serviceController = require('../Controllers/ServiceController')
const portfolioController = require('../Controllers/PorfolioController')
const messagesController = require('../Controllers/MessageController')
const userController = require('../Controllers/UserController')
const { authenticateJWT, authenticatePupilJWT } = require('../Middlewares/AuthMiddleware')

router.get('/posts', postsController.getPosts)
router.post('/posts/create', authenticateJWT, postsController.createPost)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', authenticateJWT, postsController.deletePost)
router.post('/posts/:id/update', authenticateJWT, postsController.updatePost)

router.get('/profession/:type', lessonsController.getLessons)
router.get('/profession/:type/:id', lessonsController.getLesson)
router.post('/profession/:type/create', authenticateJWT, lessonsController.createLesson)
router.get('/profession', lessonsController.getAllLessons)
router.get('/profession/:type/:id/delete', authenticateJWT, lessonsController.deleteLesson)
router.post('/profession/:type/:id/update', authenticateJWT, lessonsController.updateLesson)

router.post('/upload/:path', downloadController.upload)
router.get('/files/:category', downloadController.getFiles)
router.get('/uploadedfiles', downloadController.getFileTree)
router.get('/uploadedfiles/download/:filename', downloadController.downloadFile)

router.get('/auth', authController.auth)
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.post('/results', testsController.saveResult)
router.get('/results', authenticateJWT, testsController.getResults)
router.get('/results/:id', authenticateJWT, testsController.getResult)

router.post('/portfolio/add', authenticatePupilJWT, portfolioController.addPortfolio)
router.get('/portfolio/:username', portfolioController.getPortfolio)

router.post('/messages/send', authenticateJWT, messagesController.send)
router.get('/messages/get/:username', messagesController.get)
router.get('/messages/read', authenticateJWT, messagesController.read)

router.get('/users/get/:username', authenticatePupilJWT, userController.getByUsername)

router.get('/status', serviceController.isAvailable)

module.exports = router