const jwt = require('jsonwebtoken')
const errorCatcher = require('express-async-handler')


const protect = errorCatcher(async (req, res, next) => {
    let token

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Get token 
            token = req.headers.authorization.split(' ')[1]
    
            // Verify token
            const decoded = jwt.verify(token, process.env.APP_SECRET_PHRASE)
    
            req.user = decoded.user
            next()
        }
    } catch (error) {
        res.status(403)
        throw new Error('Not authorized')
    }

    if (!token) {
        res.status(403)
        throw new Error('Authorization denied, no token')
    }
})


module.exports = protect