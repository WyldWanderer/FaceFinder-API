const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex =require('knex') 

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'tylerscott',
      password : '',
      database : 'smartbrain'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success')
        } else {
            res.status(404).json('user not found')
        }
    res.json('signing')
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db('users').insert({
        email : email, 
        name : name, 
        joined : new Date()
    }).then(console.log)
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            return res.json(users);
        }
    })
    if (!found) {
        res.status(400).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            users.entries ++
            return res.json(users.entries);
        }
    })
    if (!found) {
        res.status(400).json('user not found');
    }
})

/* bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})