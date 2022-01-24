const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const lessonsController = require('../Controllers/LessonsControllers')
const downloadController = require('../Controllers/DownloadControllers')

router.get('/posts', postsController.getPosts)
router.post('/posts/create', postsController.createPost)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', postsController.deletePost)

router.get('/profession/:type', lessonsController.getLessons)
router.post('/profession/:type', lessonsController.createLesson)
router.get('/profession', lessonsController.getAllLessons)
router.get('/profession/:type/:id/delete', lessonsController.deleteLesson)

router.get('/download/:filename', downloadController.download)
router.post('/upload', downloadController.upload)




// router.get('/', (req, res) => {
//     res.json([{
//         id: 1,
//         title: 'Some title',
//         headText: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.',
//         bottomText: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.',
//         image: 'https://sun9-56.userapi.com/impg/Xf4WNWcvVWz4H4N59ZLEbI2rGmovNbUerYH_-w/zsbRZUC_mA0.jpg?size=275x183&quality=96&sign=f25dab29051dbfddac35964843286970&type=album'
//     }])
// })
// router.get('/:id', (req, res) => {
//     console.log(req.params);
// })

module.exports = router