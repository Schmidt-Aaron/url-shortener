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
//obfuscate / change db later
var url = 'mongodb://fcc-url:short-url@ds062339.mlab.com:62339/url-short';
var currentEntry;

MongoClient.connect(url, function(err, db){
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
    }
    
    //create collection if needed
    db.createCollection("urls", {
        capped: true,
        size: 5242880,
        max: 1000
    });

    //do the things with the db
    var collection = db.collection('urls');

    //insert a few test values to play with
    // collection.insert( {
    //     'originalUrl': 'https://expressjs.com/en/guide/routing.html',
    //     'shortUrl': '1111'
    // });

    //retrieve original url value and GET it
    // var stringToFind = function(str){
    //     collection.find({
    //             'shortUrl': str
    //     },      'originalUrl'
    //     )
    // }
    // stringToFind('test');

    collection.findOne( { 'shortUrl': 'test' }, function(err, data) {
        if(err) {
            console.log(err);
        }

        //match in db
        if(data) {
            console.log(data);
           // res.redirect(data.originalUrl);
        } else {
            //no match
            console.log('no match in db');
           // res.send("oops, this url is not in the db");
        }
    });

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