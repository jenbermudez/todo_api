const express = require('express')
const validate = require('validate.js');

const app = express()
const port = 3000

app.use(express.json())

const todos = {
    _id: 0,
    _items: [],
    add: function (message, accountId) {
        const todo = { account_Id: accountId, message: message }
        const idError = validate.single(accountId, { presence: true, length: { minimum: 1 } });

        if (idError) {
            throw "Account Id " + idError[0];
        }

        todo._id = ++todos._id;
        todos._items.push(todo)
        return todo
    },
    _idCheck: function (idGiven) {
        for (let i = 0; i < todos._items.length; i++) {
            if (todos._items[i]._id === idGiven) {
                return i
            }
        }
        throw "id does not exist"
    },
    getById: function (idGiven) {
        const position = todos._idCheck(idGiven)
        return todos._items[position]
    },
    update: function (idGiven, message) {
        const position = todos._idCheck(idGiven)
        todos._items[position].message = message
        return todos._items[position]
    },
    delete: function (idGiven) {
        const position = todos._idCheck(idGiven)
        todos._items.splice(position, 1)
        return "deleted"
    },
    getAll: function () {
        return todos._items
    }
}

const accounts = {
    _id: 0,
    _items: [],
    _inputCheck: function (acctObj) {
        const constraints = {
            firstName: {
                presence: true,
                length: { minimum: 1 }
            },
            lastName: {
                presence: true,
                length: { minimum: 1 }
            },
            email: {
                presence: true,
                email: true
            }
        }

        const inputErrors = validate(acctObj, constraints, { format: 'flat' });
        if (inputErrors) {
            throw inputErrors
        }
    },
    create: function (firstName, lastName, email) {
        const account = { firstName, lastName, email }

        accounts._inputCheck(account);

        for (let i = 0; i < accounts._items.length; i++) {
            if (accounts._items[i].email === email) {
                throw "email already exists"
            }
        }

        account._id = ++accounts._id
        accounts._items.push(account)
        return account
    },
    getAll: function () {
        return accounts._items
    },
    _idCheck: function (idGiven) {
        for (let i = 0; i < accounts._items.length; i++) {
            if (accounts._items[i]._id === idGiven) {
                return i
            }
        }
        throw "id does not exist"
    },
    getById: function (idGiven) {
        const position = accounts._idCheck(idGiven)
        return accounts._items[position]
    },
    update: function (idGiven, firstName, lastName, email) {
        const position = accounts._idCheck(idGiven);
        const item = accounts._items[position];
        const accountUpdate = { firstName, lastName, email }

        accounts._inputCheck(accountUpdate);

        item.firstName = firstName;
        item.lastName = lastName;
        item.email = email;

        return item
    },
    delete: function (idGiven) {
        const position = accounts._idCheck(idGiven)
        accounts._items.splice(position, 1)
        return "deleted"
    }
}

// *************TODOS******************
// GET /todo => all todos
app.get('/todo', (req, res) => res.json(todos.getAll()))

// POST /todo => insert new todo using body as message, return new todo with id included
app.post('/todo', (req, res) => {
    const message = req.body.message;
    const accountId = req.body.account_Id;
    try {
        res.status(201).json(todos.add(message, accountId));
    } catch (e) {
        res.status(400).json({ error: e })
    }

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

// ***************ACCOUNTS*****************
// GET /account => all accounts
app.get('/account', (req, res) => {
    res.json(accounts.getAll())
})

// POST /account => create new account using body for first name, last name, and email, return new account created with id inlcuded
app.post('/account', (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        res.status(201).json(accounts.create(firstName, lastName, email))
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// GET /account/<id> => return account with id = <id>
app.get('/account/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        res.json(accounts.getById(id))
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// PUT /account/<id> => update account with id = <id>
app.put('/account/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email } = req.body;
    try {
        res.json(accounts.update(id, firstName, lastName, email))
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

// DELETE /account/<id> => delete account with id = <id>
app.delete('/account/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        res.json(accounts.delete(id));
    } catch (e) {
        res.status(400).json({ error: e })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))