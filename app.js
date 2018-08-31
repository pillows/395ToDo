const express = require('express')

const registerUser = require('./router/register.js')
const loginUser = require('./router/login.js')
const todoList = require('./router/todo.js')
const path = require('path')
const session = require('express-session')
const uuid = require('uuid/v4')
var bodyParser = require('body-parser')
var exphbs  = require('express-handlebars');
var engine = require('consolidate');


const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('views', __dirname + '/views');
app.engine('html', exphbs({defaultLayout: 'main.html'}));
app.set('view engine', 'html');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'cat ninja',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 },
  // Has to be set to false because testing on non-https localhost
  // Best practice is to set to true
}))

app.use(express.static('public'))



app.get('/', (req, res) => {
  if(req.session.username)
    res.redirect('/todo')
  else
    res.redirect('/login')
})
app.use('/register', registerUser);
app.use('/login', loginUser);
app.use('/todo', todoList);
app.use('/logout', (req, res)=>{
  // Only for the purpose of debugging.
  req.session.destroy();
  res.redirect('/login');
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
