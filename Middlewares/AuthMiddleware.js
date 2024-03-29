const jwt = require('jsonwebtoken');

class authMiddlewares {
    authenticateJWT = (req, res, next, role = "admin") => {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.json(err)
                if (user.role !== role) return res.status(401) 
                req.user = user
                next();
            })
        } else {
            res.sendStatus(401)
        }
    }

    authenticatePupilJWT = (req, res, next, role = "pupil") => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.json(err);
                if (user.role === 'admin') next();
                else if (user.role !== role) return res.status(401);
                req.user = user;
                next();
            })
        } else {
            res.sendStatus(401)
        }
    }
}
module.exports = new authMiddlewares()
