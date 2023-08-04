const pool = require('../config/db')

const getAllTodos = async (req, res) => {
    try {
        const todos = await pool.query('SELECT u.user_name, t.todo_id, t.todo_description FROM users AS u LEFT JOIN todo As t ON u.user_id = t.user_id WHERE u.user_id = $1', [
            req.user.id
        ])

        res.status(200).json(todos.rows)
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
}

const getSpecificTodo = async (req, res) => {
    const { id } = req.params

    try {
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2', [id, req.user.id])
        // More concise way to do this ↓
        // const todo = await pool.query(`SELECT * FROM todo WHERE id = ${id}`)

        if (todo.rows.length === 0) {
            res.status(400)
            throw new Error('It is not your todo')
        }

        res.status(200).json(todo.rows)
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
}

const createTodo = async (req, res) => {
    try {
        const { description } = req.body
        // $1 is essentially a variable that will be replaced with value in []
        // * means all
        const createTodo = await pool.query(
            'INSERT INTO todo (user_id, todo_description) VALUES ($1, $2) RETURNING *', 
            [req.user.id, description]
        )
        res.status(200).json(createTodo.rows[0])
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params
    const { description } = req.body

    try {
        const updateTodo = await pool.query('UPDATE todo SET todo_description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *', [description, id, req.user.id])
        // More concise way to do this ↓
        // const updatedTodo = await pool.query(`UPDATE todo SET description = '${description}' WHERE id = ${id}`)

        if (updateTodo.rows.length === 0) {
            res.status(400)
            throw new Error('It is not your todo')
        }

        res.status(200).json('Todo was updated')
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *', [id, req.user.id])

        if (deleteTodo.rows.length === 0) {
            res.status(400)
            throw new Error('It is not your todo')
        }

        res.status(200).json('Todo was deleted')
    } catch (error) {
        res.status(400)
        res.send(error.message)
    }
}


module.exports = {
    getAllTodos,
    getSpecificTodo,
    createTodo,
    updateTodo,
    deleteTodo
}