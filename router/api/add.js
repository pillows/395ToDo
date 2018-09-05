const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');
const session = require('express-session')
const uuidv4 = require('uuid/v4')

router.get('/', function(req, res, next) {
  const result = {
    "message":"Improper method"
  }
  res.json(result);
});

router.post('/', function(req, res, next) {


  // Sort of preventing unauthorized access?
  // Could be made into middleware instead
  const username =req.session.username;
  if(username === undefined){
    result.message = "Not authorized"
    res.json(result);
  }

  const result = {
    "message":"",
    "uuid":"",
    "status":""
  }
  const item = req.body.description;
  const uuid = uuidv4();
  result.uuid = uuid;
  db.run(`INSERT INTO todo(username, description, status, uuid)
  VALUES((?),(?),(?),(?))
  `,[username, item, "open",uuid]);
  console.log(item);
  result.message = "done";
  result.uuid = uuid;

  res.json(result);
});
module.exports = router;
