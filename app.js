//step 1 make it work. 
//step 2 make it pretty.

//load express and other dependencies
var express = require('express');
var app = express();
var validUrl = require('valid-url');
var shortid = require('shortid');


//test urls
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
//add PROCESS.env / change db later
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

    //insert a few test values to play with delete later
    // collection.insert( {
    //     'originalUrl': "test.com",
    //      'shortUrl': shortid.generate();
    //  });

    //collection.insert( {
    //     'originalUrl': passedUrl,
    //     'shortUrl': generate a new id
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
});//end db


//static page with usage instruction
app.use(express.static('public'));

//test passed string
app.get('/new/:url(*)', function(req, res, next) {
    var param = req.params.url;
    var newId = shortid.generate();
    console.log(param);
    if(isValid(param)) {
        res.send({
            'long_url': param ,
            'short_url': newId
        });
    } else {
        res.send("that was not a properly formatted url. Please Try again. Urls need to be in the following format: http://url.com")
    }
});

app.get('/id', function(req, res){
    var sid = shortid.generate();
    res.send(sid);
    console.log(sid);
} )


var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
    console.log(`Listening on ${port}.`)
});