const express = require('express')
const {
    getAllTodos,
    getSpecificTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController')
const router = express.Router()

router.route('/').get(getAllTodos).post(createTodo)
router.route('/:id').get(getSpecificTodo).put(updateTodo).delete(deleteTodo)

module.exports = router