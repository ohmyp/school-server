const Post = require('../Models/Post')

class postsController {
    async createPost(req, res) {
        try {
            const post = new Post({
                id: req.body.id,
                title: req.body.title,
                headText: req.body.headText,
                bottomText: req.body.bottomText,
                image: req.body.image
            })
            await post.save()
            return res.status(200).json({message: "post created successfully"})

        } catch (e) {
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
            return res.status(200).json(posts)
        } catch (e) {
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