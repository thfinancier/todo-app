const jwt = require('jsonwebtoken')

const generateToken = (user_id) => {
    return jwt.sign({ user_id }, process.env.APP_SECRET_PHRASE, {
        expiresIn: '1d'
    })
}

module.exports = generateToken