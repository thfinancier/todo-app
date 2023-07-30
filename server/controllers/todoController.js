const pool = require('../config/db')

const getAllTodos = async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todo')

        res.status(200).json(todos.rows)
    } catch (error) {
        res.status(400)
        console.error(error.message)
    }
}

const getSpecificTodo = async (req, res) => {
    const { id } = req.params

    try {
        const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
        // More concise way to do this ↓
        // const todo = await pool.query(`SELECT * FROM todo WHERE id = ${id}`)

        res.status(200).json(todo.rows)
    } catch (error) {
        res.status(400)
        console.error(error.message)
    }
}

const createTodo = async (req, res) => {
    try {
        const { description } = req.body
        // $1 is essentially a variable that will be replaced with value in []
        // * means all
        const createTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *', 
            [description]
        )
        res.status(200).json(createTodo.rows[0])
    } catch (error) {
        res.status(400)
        console.error(error.message)
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params
    const { description } = req.body

    try {
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE id = $2', [description, id])
        // More concise way to do this ↓
        // const updatedTodo = await pool.query(`UPDATE todo SET description = '${description}' WHERE id = ${id}`)

        res.status(200).json('Todo was updated')
    } catch (error) {
        res.status(400)
        console.error(error.message)
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id])

        res.status(200).json('Todo was deleted')
    } catch (error) {
        res.status(400)
        console.error(error.message)
    }
}


module.exports = {
    getAllTodos,
    getSpecificTodo,
    createTodo,
    updateTodo,
    deleteTodo
}