const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');
const session = require('express-session')


let getAll = (username, callback) => {

  db.all(`SELECT * FROM todo WHERE username = ?`,[username], function(err,rows){

    if(err != null){
        console.log(err);
        //callback(err);
    }

    callback(rows);

})
}


router.get('/', function(req, res, next) {
    var sessionData = req.session;
    const username = req.session.username;

    if(username != undefined){
      getAll(username, function(callback){
        let results = callback;
        res.render('todo.html',{
            todo:results,

        });
      });

    }
    else {
      res.redirect('/login');
    }

});

router.post('/', function(req, res, next) {
    res.render('todo.html',{
      result:null
    });
});

module.exports = router;
