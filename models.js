/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_accounts",
"_items", "_idCheck", "_inputCheck"] }] */

const validate = require('validate.js');

function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

const todos = {
  _id: 0,
  _items: [],
  add(message, accountId) {
    const todo = { account_Id: accountId, message };
    const idError = validate.single(accountId, {
      presence: true,
      numericality: { onlyInteger: true, greaterThan: 0 },
    });

    if (idError) {
      throw new UserException(`Account Id ${idError[0]}`);
    }

    todo._id = ++todos._id;
    todos._items.push(todo);
    return todo;
  },
  _idCheck(idGiven) {
    for (let i = 0; i < todos._items.length; i++) {
      if (todos._items[i]._id === idGiven) {
        return i;
      }
    }
    throw new UserException('id does not exist');
  },
  getById(idGiven) {
    const position = todos._idCheck(idGiven);
    return todos._items[position];
  },
  update(idGiven, message) {
    const position = todos._idCheck(idGiven);
    todos._items[position].message = message;
    return todos._items[position];
  },
  delete(idGiven) {
    const position = todos._idCheck(idGiven);
    todos._items.splice(position, 1);
    return 'deleted';
  },
  getAll() {
    return todos._items;
  },
};

const accounts = {
  _id: 0,
  _items: [],
  _inputCheck(acctObj) {
    const constraints = {
      firstName: {
        presence: true,
        length: { minimum: 1 },
      },
      lastName: {
        presence: true,
        length: { minimum: 1 },
      },
      email: {
        presence: true,
        email: true,
      },
    };

    const inputErrors = validate(acctObj, constraints, { format: 'flat' });
    if (inputErrors) {
      throw new UserException(inputErrors);
    }
  },
  create(firstName, lastName, email) {
    const account = { firstName, lastName, email };

    accounts._inputCheck(account);

    for (let i = 0; i < accounts._items.length; i++) {
      if (accounts._items[i].email === email) {
        throw new UserException('email already exists');
      }
    }

    account._id = ++accounts._id;
    accounts._items.push(account);
    return account;
  },
  getAll() {
    return accounts._items;
  },
  _idCheck(idGiven) {
    for (let i = 0; i < accounts._items.length; i++) {
      if (accounts._items[i]._id === idGiven) {
        return i;
      }
    }
    throw new UserException('id does not exist');
  },
  getById(idGiven) {
    const position = accounts._idCheck(idGiven);
    return accounts._items[position];
  },
  update(idGiven, firstName, lastName, email) {
    const position = accounts._idCheck(idGiven);
    const item = accounts._items[position];
    const accountUpdate = { firstName, lastName, email };

    accounts._inputCheck(accountUpdate);

    item.firstName = firstName;
    item.lastName = lastName;
    item.email = email;

    return item;
  },
  delete(idGiven) {
    const position = accounts._idCheck(idGiven);
    accounts._items.splice(position, 1);
    return 'deleted';
  },
};

module.exports = {
  todos,
  accounts,
  UserException,
};
