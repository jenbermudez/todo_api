const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

const todos = {
    id: 0,
    items: [],
    add: function (message) {
        const todo = { 'id': ++todos.id, 'message': message }
        todos.items.push(todo)
        return todo
    },
    idCheck: function (idGiven) {
        for (let i = 0; i < todos.items.length; i++) {
            if (todos.items[i].id === idGiven) {
                return i
            }
        }
        throw "id does not exist"
    },
    getById: function (idGiven) {
        const position = todos.idCheck(idGiven)
        return todos.items[position]
    },
    update: function (idGiven, message) {
        const position = todos.idCheck(idGiven)
        todos.items[position].message = message
        return todos.items[position]
    },
    delete: function (idGiven) {
        const position = todos.idCheck(idGiven)
        todos.items.splice(position, 1)
        return "deleted"
    },
    getAll: function () {
        return todos.items
    }
}

// GET /todo => all todos
app.get('/todo', (req, res) => res.json(todos.getAll()))

// POST /todo => insert new todo using body as message, return new todo with id included
app.post('/todo', (req, res) => {
    res.status(201).json(todos.add(req.body.message))
})

// GET /todo/<id> => return todo with id = <id>
app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id)
    try {
        res.json(todos.getById(id))
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// PUT /todo/<id> => update todo with id = <id>
app.put('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = req.body.message;
    try {
        res.json(todos.update(id, message))
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// DELETE /todo/<id> => delete todo with id = <id>
app.delete('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        res.json(todos.delete(id));
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))