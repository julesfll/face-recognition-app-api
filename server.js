const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'brain',
  },
});

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {});

/*
ALWAYS SEND SENSITVE INFORMATION:
1. Via https
2. In a POST body
3. Encrypt it before storing it in a database
*/

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));

app.post('/imageurl', image.handleApiCall)

app.listen(5000, () => {
  console.log('app is running on port 5000');
});
