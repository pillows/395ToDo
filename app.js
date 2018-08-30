const express = require('express')

const registerUser = require('./router/register.js')
const loginUser = require('./router/login.js')
const todoList = require('./router/todo.js')
const path = require('path')
const session = require('express-session')
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

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'cat ninja',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  // Has to be set to false because testing on non-https localhost
  // Best practice is to set to true
}))



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/register', registerUser);
app.use('/login', loginUser);
app.use('/todo', todoList);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
