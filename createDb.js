const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/mydb.db');

db.run(`CREATE TABLE "todo" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"username"	TEXT,
	"description"	TEXT,
	"status"	TEXT,
	"uuid"	TEXT
)`);

db.run(`
CREATE TABLE "users" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"username"	TEXT
);`)
