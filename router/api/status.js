const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');

router.get('/', function(req, res, next) {
  res.send("Improper method");
});

let statusChangeValue = (uuid, status) =>{
  console.log("values ", uuid, status);
  db.run(`UPDATE todo SET status = ? WHERE uuid = ?`,[status, uuid],function(err,row){

  })
}

let deleteItem = (uuid) => {
  db.run(`DELETE FROM todo
WHERE uuid = ?;)
  `,[uuid]);
}
router.post('/', function(req, res, next) {
  let result = {
    "message":""
  }
  // Sort of preventing unauthorized access?
  // Could be made into middleware instead
  const username = req.session.username;
  if(username === undefined){
    result.message = "Not authorized";
    res.json(result);
  }

  // Only possibilities are "done", "open" and "delete"
  const status = req.body.status;

  const uuid = req.body.uuid;
  console.log(uuid);

  if(status == "done" || status == "open"){
    console.log("current status ", status);
    statusChangeValue(uuid, status);
    result.message = status;
    res.json(result);
  }
  else {
    deleteItem(uuid);
    result.message = "deleted";
    res.json(result);
  }




});

module.exports = router;
