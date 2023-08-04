const express = require('express')
const {
    getAllTodos,
    getSpecificTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllTodos).post(protect, createTodo)
router.route('/:id').get(protect, getSpecificTodo).put(protect, updateTodo).delete(protect, deleteTodo)

module.exports = router