const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.post('/user', (req,res,next) => {

    var userHeader = '<h1>'
    + req.body.firstName + ' '
    + req.body.lastName + '</br>'
    + req.body.email + '</br>'
    + req.body.address + '</br>'
    + req.body.username + '</br>'
    + req.body.password
    + '</h1>';

    // we can write the same string to a file but we need to replace the html tags to make it readable.
    const content = userHeader.replace(/<\/br>/g, '\n').replace(/<h1>/g, '').replace(/<\/h1>/g, '');
    fs.writeFile('./user.txt', content, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Success1');
        }
    });

    res.send(userHeader);
});

app.get('/',(req, res, next)=> {

    res.send(`
    <form action="user" method="POST">
        <div>
            <label>First Name: </label>
            <input type="text" name="firstName">
        </div>
        <div>
            <label>Last Name: </label>
            <input type="text" name="lastName">
        </div>
        <div>
            <label>Email: </label>
            <input type="text" name="email">
        </div>
        <div>
            <label>Address: </label>
            <input type="text" name="address">
        </div>
        <div>
            <label>Username: </label>
            <input type="text" name="username">
        </div>
        <div>
            <label>Password: </label>
            <input type="text" name="password">
        </div>
        <br/>
        <button type="submit">Create User </button>
    </form>`);


});

app.listen(3000);