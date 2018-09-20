const {SHA256} = require('crypto-js');

let message = 'I am user number 3.';
let hash = SHA256(message).toString();

console.log(message);
console.log(hash);

let data = {
    id: 4,
};

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

console.log({
    a: token.hash,
    b: resultHash
});