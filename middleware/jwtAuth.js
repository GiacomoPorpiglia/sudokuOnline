const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET)

        res.locals.jwtPayload = jwt.decode(token)

        next()
    } catch (error) {
        res.status(500).json({message: "JWT auth failed"})
    }

}

module.exports = {
    jwtAuth
}