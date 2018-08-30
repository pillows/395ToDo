const express = require('express')

const registerUser = require('./router/register.js')
const path = require('path')
var engine = require('consolidate');


const app = express()

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/register', registerUser);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
