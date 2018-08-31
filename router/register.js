const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');


let checkUser = (username, callback) => {
    db.get(`SELECT username from users WHERE username = ?`, [username], function(err, rows) {

        if(rows == undefined){
          callback(false);
        }
        else{
          callback(true);
        }



    });
}
/*
addUser will be checking and adding the username in the Database
if the user exists then don't add and return false
if the user does not exist just execute the query and return true

the return value reflects what will be displayed after the POST request
*/
let addUser = (username, callback) => {
    checkUser(username, function(callbackCheck) {
        // User does not exist

        if (callbackCheck == false) {
            db.run(`INSERT into users(username) VALUES (?)`, [username], function(err) {
                if (err) {
                    console.log(err);
                }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });

            callback(true); // Query ran well
        } else {
            callback(false); // Ask the user for a different name
        }
    });



}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register.html',{
      result:null
    });
});


router.post('/', function(req, res, next) {
    // Grab the username from POST data
    const username = req.body.username;
    //console.log(username);
    const result = addUser(username, function(callback) {
        var message;
        console.log(username);
        if (callback == true) {
            message = "User has been registered";
        } else {
            message = `Pick another username. The username "${username}" already exists`;
        }
        const displayResult = callback ? "true" : "false";

        res.render("register.html", {
            result: message
        });
    });


});

module.exports = router;
