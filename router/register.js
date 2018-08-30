const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register.html');
});

module.exports = router;
