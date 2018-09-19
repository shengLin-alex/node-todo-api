let express  = require('express');
let bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
let { User } = require('./models/user');
let { Todo } = require('./models/todo');

let app = express();
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

app.listen(3000, () => {
    console.log('Started on port 3000');
});