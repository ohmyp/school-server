const logger = require('../logger')
const Post = require('../Models/Post')

class postsController {
    async createPost(req, res) {
        try {
            const post = new Post({
                id: req.body.id,
                title: req.body.title,
                postBody: req.body.postBody,
            })
            await post.save()
            logger.admin(req)
            return res.status(200).json({message: "post created successfully"})
        } catch (e) {
            logger.adminError(e)
            console.log(e);
            if (e.code === 11000){
                return res.status(400).send({message: `Пост с таким номером (${e.keyValue.id}) уже существует!`})
            }
            return res.status(400).send({message: e.message})
        }
    }
    async getPost(req, res) {
        try {
            const posts = await Post.findOne({
                id: req.params.id
            })
            logger.user(req)
            return res.status(200).json(posts)
        } catch (e) {
            logger.userError(req)
            console.log(e);
            res.status(500).json(e)
        }
    }
    async deletePost(req, res) {
        try {
            const posts = await Post.deleteOne({
                id: req.params.id
            })
            if (!posts.deletedCount) {return res.status(400).json({message: `no post with id ${req.params.id}`})}
            logger.admin(req)
            return res.status(200).json({
                message: "post deleted successfully"
            })
        } catch (e) {
            logger.adminError(e)
            console.log(e);
            res.status(500).json(e)
        }
    }
    async getPosts(req, res) {
        try {
            const posts = await Post.find({})
            return res.status(200).json(posts)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async updatePost(req, res) {
        try {
            const update = await Post.findOneAndUpdate(
                {
                    id: req.params.id
                }, {
                    id: req.body.id,
                    title: req.body.title,
                    postBody: req.body.postBody,
                }, {
                    new: true
                }
            )
            logger.admin(req)
            return res.status(200).json(update)
        } catch (e) {
            logger.adminError(e)
            console.log(e);
            res.status(500).json(e)
        }
    }
}

module.exports = new postsController()
