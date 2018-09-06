#!/bin/sh

mkdir db
touch db/mydb.db
node createDb.js
npm install
npm start
