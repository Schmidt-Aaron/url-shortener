//fire up mongo
var app = require('./app.js');

//where the database is
// var url = 'mongodb://localhost:27017/database_name';
var url = 'mongodb://fcc-url:short-url@ds062339.mlab.com:62339/url-short';

MongoClient.connect(url, function(err, db){
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }
    
    //do the things with the db
    var collection = db.collection('urls');

    currentEntry = collection.count( 'original', (err, count) => {
        console.log(err, count);
        
        currentEntry = count;
    });

    console.log(currentEntry);

    //close connection
    db.close(() => {
        console.log('Connection to db closed');
    })
});
