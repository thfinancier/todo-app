const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const errorCatcher = require('express-async-handler')
const generateToken = require('../utils/generateToken')


const registerUser = errorCatcher(async (req, res) => {
    const { name, email, password } = req.body

    if (!name && !email && !password) {
        res.status(400)
        throw new Error('Please fill in all the fields')
    }

    const existedUser = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])
    if (existedUser.rows.length > 0) {
        res.status(401)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword])

    if (newUser) {
        res.status(201)
        res.json({
            token: generateToken(newUser.rows[0].user_id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = errorCatcher(async (req, res) => {
    const { email, password } = req.body

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])

    // user.rows returns user data in an object, user.rows[0] returns the same data but without curly braces
    if (user && (await bcrypt.compare(password, user.rows[0].user_password))) {
        res.status(200).json({
            token: generateToken(user.rows[0].user_id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// get user 'profile' data (name, email, age, etc.)
// send back user in json

const getUserData = errorCatcher(async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
        req.user.id
    ])

    const userId = user.rows[0].user_id
    const userName = user.rows[0].user_name
    const userEmail = user.rows[0].user_email

    res.status(200).json({
        id: userId,
        name: userName,
        email: userEmail
    })
})


module.exports = {
    registerUser, 
    loginUser, 
    getUserData
}