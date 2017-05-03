/** /app/checkUrl.js */
// takes the request parameter and checks to see if it is
// a valid url then sends to the controller if valid or returns an error
// if not valid

var validUrl = require('valid-url');

var isValid = function(url) {
     if(validUrl.isUri(url)) {
        console.log(url + ' is a valid url. Way to go champ!');
        res.send('this is a valid url')
    } else {
        console.log('not a valid url');
        res.send('not a valid url. Please try again.');
    }
}


module.exports = {
    isValid: isValid
};