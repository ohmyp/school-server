const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ctt = require("cyrillic-to-translit-js")
const logger = require('../logger')
const fetchDB = require('../Handlers/DataBaseHandler')

class authController {
    async register(req, res, next) {
        const { name, surname, middlename, classname } = req.body
        let username = surname+'.'+name.split('')[0]+middlename?.split('')[0]+Math.floor(Math.random()*10)
        username = ctt().transform(username.toLowerCase())
	    const role = classname === "admin" ? "admin" : "pupil" 
        const password = Math.random().toString(36).slice(-8);
        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) res.status(500)
            try {
                const query = await fetchDB(`insert into user (firstname, lastname, middlename, classname, username, password, role) values ("${name}", '${surname}', '${middlename}', "${classname}", '${username}', "${hash}", "${role}");`)
                res.send({username, password, role})
            } catch (e) {
                console.log(e)
                res.send(e)
            }
        });
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        const candidate = await fetchDB(`select * from user where username='${username}';`).then(res => res[0])
        if (candidate) {
            bcrypt.compare(password, candidate.password, (err, result) => {
                if (err) res.status(500)
                if (result){
                    const accessToken = jwt.sign({
                        username: candidate.username,
                        role: candidate.role,
                        name: candidate.firstname,
                        surname: candidate.lastname,
                        middlename: candidate.middlename,
                        classname: candidate.classname
                    }, process.env.JWT_SECRET)
                    logger.log(req)
                    res.json({
                        accessToken
                    })
                }
                else res.json({error:'Неправильный пароль'})
            })
        } else {
            res.send({error:'Неправильное имя пользователя'})
        }
    }

    // async getUsers (req, res, next){
    //     const users = await UserNoHash.find({})
    //     res.json(users)
    // }

    async auth(req, res, next){
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.json(err)
                logger.log(req)
                return res.json(user)
            })
        } else {
            res.sendStatus(401)
        }
    }
}

module.exports = new authController()
