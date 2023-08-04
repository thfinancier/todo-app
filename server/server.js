const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')


const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/todos', require('./routes/todoRoutes'))
app.use('/api/auth', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port}`.grey))