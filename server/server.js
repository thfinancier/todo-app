const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/todos', require('./routes/todoRoutes'))

app.listen(port, () => console.log(`Server is running on port: ${port}`))