//load express and other dependencies
var express = require('express');
var app = express();

app.use(express.static('public'));

// //fire up mongo
var MongoClient = require('mongodb').MongoClient;

// //where the database is
// var url = 'mongodb://localhost:27017/database_name';
var url = "see onenote book;
var currentEntry;

MongoClient.connect(url, function(err, db){
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }
    
    //do the things with the db
    var collection = db.collection('urls');
    // collection.insert( {
    //     'original': 'http://google.com',
    //     'new': '1'
    // });

    currentEntry = collection.count({'original'}, (err, count) => {
        console.log(err, count);
        
        currentEntry = count;
    });

    console.log(currentEntry);

    //close connection
    db.close(() => {
        console.log('Connection to db closed');
    })
});

var port = process.env.port || 3000;
app.set('port', port);
app.listen(port, () => {
    console.log(`Listening on ${port}.`)
});