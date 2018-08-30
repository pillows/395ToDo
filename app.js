const express = require('express')

const registerUser = require('./router/register.js')
const loginUser = require('./router/login.js')
const path = require('path')
var bodyParser = require('body-parser')

var engine = require('consolidate');


const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/register', registerUser);
app.use('/login', loginUser);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
