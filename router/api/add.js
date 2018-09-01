const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');

router.get('/', function(req, res, next) {
  res.send("Improper method");
});

router.post('/', function(req, res, next) {

});
module.exports = router;
