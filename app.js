//step 1 make it work... yep!
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
app.get('/new/:url(*)', function(req, res) {
    MongoClient.connect(url, function(err, db){
        if(err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            
            var newUrl = req.params.url;

            //first check the parameter to see if it is a valid URL

            //if a valid URL was passed
            if(isValid(newUrl)){

                //time to do the things with the db
                var collection = db.collection('urls');

                //first check if the entry exists in db
                var insertUrl = function(db, callback) {
                    collection.findOne( { 'longUrl': newUrl }
                        , {'longUrl': 1, 'shortUrl': 1, _id: 0}
                        , function(err, result){
                        if(err){
                            console.log("err: " + err);
                        }
                        
                        //what to do if found
                        if(result != null){
                            console.log("url already exists");
                            res.send({
                            'longUrl': result.longUrl,
                            'shortUrl': 'localhost:3000/' + result.shortUrl
                            });
                        } else {
                        //what to do if not found
                        //add validation if/else
                            console.log("result is not found")
                            var newId = shortid.generate();
                            console.log(newId, newUrl)
                            var newLink = {
                                'longUrl': newUrl,
                                'shortUrl': newId
                            };
                        
                            //collection.insertOne(newLink);
                            collection.insertOne(newLink);
                        }
                    })
                }//end insertUrl

            

                insertUrl(db, function(){
                    collection.findOne({'longUrl': newUrl}, {'longUrl': 1, _id: 0}, function(err, result){
                        if (err) {
                            console.log("error is: " + err)
                        }
                                        
                        res.send( {
                            'longUrl': result.longUrl,
                            'shortUrl': 'localhost:3000/' + result.shortUrl});
                        });
                    //close our connection    
                    db.close();
                })
            } else {
                console.log('not a valid URL');
                res.send('not a valid URL, please try again');
            }
        }
    });//end mongo
});  //end app.get  

app.get('/:url', function(req, res){
    var shortUrl = req.params.url;
    var longUrl;

    MongoClient.connect(url, function(err, db){
        if(err) {
            console.log(err)
        } else {
            console.log('Connection established to', url);

            var collection = db.collection('urls');

            var checkUrl = function(db, callback) {
                collection.findOne( { 'shortUrl': shortUrl }
                    , {'longUrl': 1, 'shortUrl': 1, _id: 0}
                    , function(err, result){
                    console.log({"error": err, "result": result});
                    
                        //if not found
                        if(result == null) {
                            console.log("result not found");
                            res.send("URL not found, please try again.")
                        }

                        //if found
                        if(result != null){
                            longUrl = result.longUrl;
                            res.redirect(result.longUrl);
                        }

                    }
                )    
            }//end checkUrl

            checkUrl(db, function(){
                db.close();
                console.log("db connection closed");
            });
        }   
    })  //end connect         
});


var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, function(){
    console.log(`Listening on ${port}.`);
})