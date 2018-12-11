const express = require('express');
const { todos, accounts } = require('./models.js');

const app = express();
const port = 3000;

app.use(express.json());

function checkError(e, res) {
  if (e.name === 'UserException') {
    res.status(400).json({ error: e.message });
  } else {
    console.error(e);
    throw 'Something went wrong  ¯\\_(ツ)_/¯';
  }
}

// *************TODOS******************
// GET /todo => all todos
app.get('/todo', (req, res) => res.json(todos.getAll()));

// POST /todo => insert new todo using body as message, return new todo with id included
app.post('/todo', (req, res) => {
  const message = req.body.message;
  const accountId = req.body.account_Id;
  try {
    res.status(201).json(todos.add(message, accountId));
  } catch (e) {
    checkError(e, res);
  }
});

// GET /todo/<id> => return todo with id = <id>
app.get('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    res.json(todos.getById(id));
  } catch (e) {
    checkError(e, res);
  }
});

// PUT /todo/<id> => update todo with id = <id>
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const message = req.body.message;
  try {
    res.json(todos.update(id, message));
  } catch (e) {
    checkError(e, res);
  }
});

// DELETE /todo/<id> => delete todo with id = <id>
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    res.json(todos.delete(id));
  } catch (e) {
    checkError(e, res);
  }
});

// ***************ACCOUNTS*****************
// GET /account => all accounts
app.get('/account', (req, res) => {
  res.json(accounts.getAll());
});

// POST /account => create new account using body for first name, last name, and email, return new account created with id inlcuded
app.post('/account', (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    res.status(201).json(accounts.create(firstName, lastName, email));
  } catch (e) {
    checkError(e, res);
  }
});

// GET /account/<id> => return account with id = <id>
app.get('/account/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    res.json(accounts.getById(id));
  } catch (e) {
    checkError(e, res);
  }
});

// PUT /account/<id> => update account with id = <id>
app.put('/account/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email } = req.body;
  try {
    res.json(accounts.update(id, firstName, lastName, email));
  } catch (e) {
    checkError(e, res);
  }
});

// DELETE /account/<id> => delete account with id = <id>
app.delete('/account/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    res.json(accounts.delete(id));
  } catch (e) {
    checkError(e, res);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
