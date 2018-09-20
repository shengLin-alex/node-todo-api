let express  = require('express');
let bodyParser = require('body-parser');

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

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};