// 解構賦值
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server.');
    }

    console.log('success to connect.');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    db.collection('Todos')
        .findOneAndDelete({_id:new ObjectID('5ba0bdfb6e89a00be2012fb6')})
        .then((result) => {
            console.log(result);
        });

    client.close();
});