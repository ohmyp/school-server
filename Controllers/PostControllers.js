const logger = require('../logger')
const mysql = require("mysql2");

function fetchDB(query, res){
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "oneschool",
        password: "ifmoCRETA2133mari!"
    })
    connection.connect((err) => {
        if (err) {
            return console.error("Ошибка: " + err.message);
        } else {
            ;
        }
    });
    connection.query(query,
    (err, results, fields) => {
        if (err) console.log(err)
        // console.log(results)
        res.json(results)
    });
}

class postsController {
    // async createPost(req, res) {
    //     try {
    //         const post = new Post({
    //             id: req.body.id,
    //             title: req.body.title,
    //             postBody: req.body.postBody,
    //         })
    //         await post.save()
    //         logger.admin(req)
    //         return res.status(200).json({message: "post created successfully"})
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         if (e.code === 11000){
    //             return res.status(400).send({message: `Пост с таким номером (${e.keyValue.id}) уже существует!`})
    //         }
    //         return res.status(400).send({message: e.message})
    //     }
    // }
    createPost(req, res, next) {
        fetchDB(`insert into post (title, postBody, image) values ("${req.body.title}", '${req.body.postBody}', "${req.body.image}");`, res)
    }
    // async deletePost(req, res) {
    //     try {
    //         const posts = await Post.deleteOne({
    //             id: req.params.id
    //         })
    //         if (!posts.deletedCount) {return res.status(400).json({message: `no post with id ${req.params.id}`})}
    //         logger.admin(req)
    //         return res.status(200).json({
    //             message: "post deleted successfully"
    //         })
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    deletePost(req, res, next) {
        fetchDB(`delete from post where id=${req.params.id};`, res)
    }
    // async updatePost(req, res) {
    //     try {
    //         const update = await Post.findOneAndUpdate(
    //             {
    //                 id: req.params.id
    //             }, {
    //                 id: req.body.id,
    //                 title: req.body.title,
    //                 postBody: req.body.postBody,
    //             }, {
    //                 new: true
    //             }
    //         )
    //         logger.admin(req)
    //         return res.status(200).json(update)
    //     } catch (e) {
    //         logger.adminError(e)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    updatePost(req, res, next) {
        fetchDB(`update post set title="${req.body.title}", postBody='${req.body.postBody}', image="${req.body.image}" where id=${req.params.id};`, res)
    }
    // async getPost(req, res) {
    //     try {
    //         const posts = await Post.findOne({
    //             id: req.params.id
    //         })
    //         logger.user(req)
    //         return res.status(200).json(posts)
    //     } catch (e) {
    //         logger.userError(req)
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    getPost(req, res, next) {
        fetchDB(`select * from post where id=${req.params.id}`, res)
    }
    // async getPosts(req, res) {
    //     try {
    //         const posts = await Post.find({})
    //         return res.status(200).json(posts)
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json(e)
    //     }
    // }
    getPosts(req, res, next) {
        fetchDB(`select * from post`, res)
    }
}

module.exports = new postsController()