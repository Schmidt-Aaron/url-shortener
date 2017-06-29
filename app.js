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
var url = 'mongodb://localhost:27017/urls';
//add PROCESS.env / change db later
//var url = 'mongodb://fcc-url:short-url@ds062339.mlab.com:62339/url-short';

//static page with usage instruction
app.use(express.static('public'));

//test passed string
app.get('/new/:url(*)', function(req, res, next) {
    MongoClient.connect(url, function(err, db){
        if(err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
        

            //time to do the things with the db
            var collection = db.collection('urls');
            var newUrl = req.params.url;

            //first check if the entry exists in db
            var insertUrl = function(db, callback) {
                collection.findOne( { 'long_Url': newUrl }
                    , {'long_url': 1, _id: 0}
                    , function(err, result){
                    console.log({"error": err, "result": result});
                    //what to do if found
                    if(result != null){
                        console.log("url already exists");
                    } else {
                    //what to do if not found
                        console.log("result is not found")
                        var newId = shortid.generate(); 
                        collection.insert({
                            "longUrl": newUrl,
                            "shortUrl": newId
                        });
                    }
                })
            }

        };//end db

        insertUrl(db, function(){
            db.close();
        })
        
    });//end /new
});    
    
//     console.log(param);
//     if(isValid(param)) {
//         res.send({
//             'long_url': param ,
//             'short_url': newId
//         });
//     } else {
//         res.send("that was not a properly formatted url. Please Try again. Urls need to be in the following format: http://url.com")
//     }
// });

app.get('/id', function(req, res){
    var sid = shortid.generate();
    res.send(sid);
    console.log(sid);
});


var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function(){
    console.log(`Listening on ${port}.`);
})