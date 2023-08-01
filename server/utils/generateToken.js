const jwt = require('jsonwebtoken')

const generateToken = (user_id) => {
    const payload = {
        user: {
            id: user_id
        }
    }

    return jwt.sign(payload, process.env.APP_SECRET_PHRASE, {
        expiresIn: '1d'
    })
}

module.exports = generateToken