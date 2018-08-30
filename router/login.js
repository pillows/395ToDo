const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');
const session = require('express-session')

let loginUser = (username, callback) =>{
  db.get(`SELECT username from users WHERE username = ?`, [username], function(err, rows) {
      console.log(rows);
      if(rows == undefined){
        callback(false); // If user does not exist
      }
      else{
        callback(true); // If user exists
      }
  });
}
router.get('/', function(req, res, next) {
  var sessionData = req.session;
  if(sessionData.username)
    res.redirect("index.html");
  res.render('login.html');
});

router.post('/', function(req, res, next) {
  const username = req.body.username;

  loginUser(username, function(callbackLogin){
    if(callbackLogin == true){
      var sessionData = req.session;
      sessionData.username = username;
      res.redirect("/")
    }
    else{
      // Return error if user does not exist

      res.render('login.html',{
        result:"User does not exist"
      });
    }
  });
});

module.exports = router;
