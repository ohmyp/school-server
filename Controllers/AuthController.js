const User = require('../Models/User')
const UserNoHash = require('../Models/UserNoHash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const ctt = require("cyrillic-to-translit-js")
class authController {
    async register(req, res, next) {
        const {name, surname, middlename, classname} = req.body
        let username = surname+'.'+name.split('')[0]+middlename?.split('')[0]+Math.floor(Math.random()*10)
        username = ctt().transform(username.toLowerCase())
        const password = Math.random().toString(36).slice(-8);
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) res.status(500)
            const user = new User({
                username,
                password: hash,
                name, surname, middlename, classname,
                role:"pupil"
            })
            const userNoHash = new UserNoHash({
                username, password,
                name: surname + " " + name + " " + middlename,
                classname
            })
            try {
                user.save()
                userNoHash.save()
                res.status(200).json(userNoHash)
            } catch (e) {
                res.send(e)
            }
        });
       
    }
    async login(req, res, next) {
        const { username, password } = req.body;
        const candidate = await User.findOne({username})        
        if (candidate) {
            bcrypt.compare(password, candidate.password, (err, result) => {
                if (err) res.status(500)
                if (result){
                    const accessToken = jwt.sign({
                        username: candidate.username,
                        role: candidate.role
                    }, process.env.JWT_SECRET)
                    res.json({accessToken})
                }
                else res.send('Password incorrect')
            })
        } else {
            res.send('Username incorrect')
        }
    }
    async getUsers (req, res, next){
        const users = await User.find({})
        res.json(users)
    }
}

module.exports = new authController()