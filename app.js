//step 1 make it work. 
//step 2 make it pretty.

//load express and other dependencies
var express = require('express');
var app = express();

//test urls
var validUrl = require('valid-url');
var isValid = function(url) {
     if(validUrl.isUri(url)) {
        console.log(url + ' is a valid url. Way to go champ!');
        return true;
    } else {
        console.log('not a valid url');
        return false;
    }
}
//end test urls
//our app modules
//var url = require('./app/url');
//var checkUrl = require('./app/checkUrl');

//fire up mongo
var MongoClient = require('mongodb').MongoClient;

//where the database is
// var url = 'mongodb://localhost:27017/database_name';
var url = 'mongodb://fcc-url:short-url@ds062339.mlab.com:62339/url-short';
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

    currentEntry = collection.count( 'original', (err, count) => {
        console.log(err, count);
        
        currentEntry = count;
    });

    console.log(currentEntry);

    //static page with usage instruction
    app.use(express.static('public'));

    //test passed string
    app.route('/:url')
        .get(strCheck)

    function strCheck(req, res){

    }

    // //capture url
    // app.route('/api/:url')
    //     .get(function(req, res) {

    //     })

    //commented out to test another method
    // app.get('/api/', function(req, res){
    //     passedUrl = req.query.url
    //     console.log(passedUrl);
    //     res.send('your url is ' + passedUrl)
    
    // })

    var port = process.env.PORT || 3000;
    app.set('port', port);
    app.listen(port, () => {
        console.log(`Listening on ${port}.`)
    });

});//end db