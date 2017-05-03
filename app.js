//load express and other dependencies
var express = require('express');
var app = express();


//our app modules
//var url = require('./app/url');
var checkUrl = require('./app/checkUrl');

//static page with usage instruction
app.use(express.static('public'));

//test passed string
app.route('/:url')
    .get(doTheGet)

function doTheGet(req, res){
    
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