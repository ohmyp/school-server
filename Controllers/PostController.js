const fetchDB = require('../Handlers/DataBaseHandler')

class postsController {
    async createPost(req, res, next) {
        try {
            const query = await fetchDB(`insert into post (title, postBody, image) values ("${req.body.title}", '${req.body.postBody}', "${req.body.image}");`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async deletePost(req, res, next) {
        try {
            const query = await fetchDB(`delete from post where id=${req.params.id};`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async updatePost(req, res, next) {
        try {
            const query = await fetchDB(`update post set title="${req.body.title}", postBody='${req.body.postBody}', image="${req.body.image}" where id=${req.params.id};`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)

        }
    }

    async getPost(req, res, next) {
        try {
            const query = await fetchDB(`select * from post where id=${req.params.id}`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    async getPosts(req, res, next) {
        try {
            const query = await fetchDB(`select * from post`)
            res.send(query)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
}

module.exports = new postsController()