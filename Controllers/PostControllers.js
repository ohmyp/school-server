const Post = require('../models/Post')

class postsController {
    async createPost(req, res) {
        try {
            const post = new Post({
                id: req.query.id,
                title: req.query.title,
                headText: req.query.headText,
                bottomText: req.query.bottomText,
                image: req.query.image
            })
            await post.save()
            return res.status(200).json({
                message: "post created successfully"
            })

        } catch (e) {
            console.log(e.message);
            res.status(400).json({
                error: e.message
            })
        }
    }
    async getPost(req, res) {
        try {
            const posts = await Post.findOne({
                id: req.params.id
            })
            return res.status(200).json(posts)
        } catch (e) {
            console.log(e);
            res.status(500).json(e)
        }
    }
    async deletePost(req, res) {
        console.log(req.params);
        try {
            const posts = await Post.deleteOne({
                id: req.params.id
            })
            if (!posts.deletedCount) {res.status(400).json({message: `no post with id ${req.params.id}`})}
            return res.status(200).json({
                message: "post deleted successfully"
            })
        } catch (e) {
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
}

module.exports = new postsController()