#!/bin/sh

mkdir db
touch db/mydb.db
npm install
node createDb.js
npm start
