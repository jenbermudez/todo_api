/* eslint-env jest */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_accounts", "_items"] }] */

const { todos, accounts, UserException } = require('./models');

describe('todos - add function', () => {
  test('can create a todo', () => {
    const result = todos.add('Boo!', 439);
    expect(result.account_Id).toBe(439);
    expect(result._id).toBe(1);
    expect(result.message).toBe('Boo!');
  });
  // expect error when todo._id provided that is 0
  test('should throw an error when todo.account_Id is 0', () => {
    expect(() => {
      todos.add('Boo!', 0);
    }).toThrow(UserException);
  });
  // expect error when todo._id provided is less than 1
  test('should throw an error when todo.account_Id is less than 1', () => {
    expect(() => {
      todos.add('Boo!', -1);
    }).toThrow(UserException);
  });
  // expect error when todo.account_Id is blank
  test('should throw an error when todo.account_Id is blank', () => {
    expect(() => {
      todos.add('Boo!');
    }).toThrow(UserException);
  });
  //   expect error when todo.message is blank --- don't think there are any
  //   constraints written for this to be the case
//   test('should throw an error when todo.message is blank', () => {
//     expect(() => {
//       todos.add(undefined, 1);
//     }).toThrow(UserException);
//   });
});

describe('accounts - create function', () => {
  test('can create an account', () => {
    const result = {
      _id: 1,
      firstName: 'Amy',
      lastName: 'Weirdo',
      email: 'amy@weirdo.com',
    };
    expect(accounts.create('Amy', 'Weirdo', 'amy@weirdo.com')).toEqual(result);
  });
  //   expect error when no email provided, how to test??
  test('should throw an error when no email is provided', () => {
    expect(() => {
      accounts.create('John', 'Jacob');
    }).toThrow(UserException);
  });
  // expect error when email provided already exists
  test('should throw an error when email provided already exists', () => {
    accounts.create('Jamie', 'Jacob', 'email@exists.com');
    expect(() => {
      accounts.create('John', 'Jacob', 'email@exists.com');
    }).toThrow(UserException);
  });
  // expect error when  no firstName is provided
  test('should throw an error when no firstName is provided', () => {
    expect(() => {
      accounts.create(undefined, 'Jacob', 'john@jacob.com');
    }).toThrow(UserException);
  });
  // expect error when no lastName is provided
  test('should throw an error when no lastName is provided', () => {
    expect(() => {
      accounts.create('John', undefined, 'john@jacob.com');
    }).toThrow(UserException);
  });
  // expect error when a bad email is provided
  test('should throw an errow when a bad email is provided', () => {
    expect(() => {
      accounts.create('John', 'Jacob', 'john@jacob');
    }).toThrow(UserException);
  });
});
