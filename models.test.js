const { todos, accounts } = require('./models');

test('can create a todo', () => {
    const result = todos.add('Boo!', 439)
    expect(result.account_Id).toBe(439)
    expect(result._id).toBe(1)
    expect(result.message).toBe('Boo!')
})