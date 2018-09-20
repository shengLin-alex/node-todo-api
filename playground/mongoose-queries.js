const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
const { ObjectId } = require('mongodb');

// let id = '5ba207126a09163350fab74f';

// console.log(!ObjectId.isValid(id));

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('id not found.');
//     }
//     console.log('todo by id', todo);
// }).catch((e) => console.log(e));

let id = '5ba1c075aba73732d05036df';

User.findById(id).then((user) => {
    if (!user) {
        console.log('user not found.');
    }
    console.log('user by id', user);
}).catch((e) => console.log(e));