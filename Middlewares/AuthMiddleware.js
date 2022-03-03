const jwt = require('jsonwebtoken');

class authMiddlewares {
    authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.json(err)
                req.user = user
                console.log(user);
                next();
            })
        } else {
            res.sendStatus(401)
        }
    }
}
module.exports = new authMiddlewares()

// const {role} = req.user;
// if (role !== 'role') {
//     return res.sendStatus(401);
// }