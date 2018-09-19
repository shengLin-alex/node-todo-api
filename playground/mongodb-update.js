// 解構賦值
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server.');
    }

    console.log('success to connect.');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     text:'Walk the dog'
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ba07b71b5aca33620402b56')
    }, {
        $inc: {
            age: 3
        },
        $set: {
            name: 'Chou'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});