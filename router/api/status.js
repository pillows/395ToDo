const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');

router.get('/', function(req, res, next) {
  res.send("Improper method");
});

let statusChangeValue = (uuid) =>{
  db.run(`UPDATE todo SET status = "done" WHERE uuid = ?`,[uuid],function(err,row){

  })
}

let deleteItem = (uuid) => {
  db.run(`DELETE FROM todo
WHERE uuid = ?;)
  `,[uuid]);
}
router.post('/', function(req, res, next) {

  // Sort of preventing unauthorized access?
  // Could be made into middleware instead
  const username =req.session.username;
  if(username === undefined){
    result.message = "Not authorized"
    res.json(result);
  }

  // Only possibilities are "done" and "delete"
  const status = req.body.status;
  const result = {
    "message":""
  }
  const uuid = req.body.uuid;
  console.log(uuid);

  if(status == "done"){
    statusChangeValue(uuid);
    result.message = "done";
    res.json(result);
  }
  else {
    deleteItem(uuid);
    result.message = "deleted";
    res.json(result);
  }




});

module.exports = router;
