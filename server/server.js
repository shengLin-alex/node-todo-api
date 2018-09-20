let express  = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');

let { mongoose } = require('./db/mongoose');
let { ObjectId } = require('mongodb');
let { User } = require('./models/user');
let { Todo } = require('./models/todo');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({});
    }

    Todo.findById(req.params.id).then((todo) => {

        if (!todo) {
            return res.status(404).send({});
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({});
    }

    Todo.findByIdAndDelete(req.params.id).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }

        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};