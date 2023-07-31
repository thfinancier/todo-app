// signup, login, get user data
const express = require('express')
const {
    registerUser, 
    loginUser, 
    getUserData
} = require('../controllers/userController')
const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('user-data', getUserData)

module.exports = router