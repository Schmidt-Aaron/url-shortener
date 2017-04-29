//load express and other dependencies
var express = require('express');
var app = express();

//fire up mongo
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

//where the database is
var url = 'mongodb://localhost:27017/database_name';

MongoClient.connect(url, function(err, db){
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }

    //do the things with the db

    //close connection
    db.close()
});