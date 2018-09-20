const jwt = require('jsonwebtoken');

let data = {
    id: 10,
    name: 'jackson',
    hobbit: {
        one: 'fuck your mother',
        two: 'fuck your sister'
    }
};

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log(decoded);