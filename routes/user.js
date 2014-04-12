var request = require('request');
var mongoose = require('mongoose'),
     User = mongoose.model('User');

var CLIENT_ID = '963802132157-reum0eulsjrqtsf0fn8dnnr3hv4sccqt.apps.googleusercontent.com';
var REDIRECT_URL = 'http://localhost:3000/auth/google/callback';
var CLIENT_SECRET = 'u27PzhHoLN7mf6rkTdP42sCE';
exports.list = function(req, res){
    res.send("respond with a resource");
};

exports.googleOAuth = function(req, res){
    var googleOAuthUrl = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=' +
        REDIRECT_URL + '&response_type=code&client_id=' + CLIENT_ID + '&approval_prompt=force&scope=email%20profile&access_type=offline';
    res.redirect(googleOAuthUrl);
};

function saveUser(result, accessToken, callback) {
    var user = new User({ name: result.name, email: result.email, accessTocken: accessToken});
    user.save(function (error) {
        if (error) {
            return console.error(error);
        }
        callback();
    });
}
function getUserInfo(googleApiUserInfoUrl, accessToken, callback) {
    request.get(googleApiUserInfoUrl + "?access_token=" + accessToken, function (error, rsponse, body) {
        var statusCode = rsponse.statusCode;
        var result = JSON.parse(body);
        if (error) {
            return console.error('google api userinfo fail:', error);
        }
        console.log(googleApiUserInfoUrl + " statusCode : " + statusCode);
        if (statusCode == 200) {
            callback(result);
        } else {
            return console.error('google api userinfo fail statusCode :', statusCode);
        }
    });
}
function getToken(googleApiTokenUrl, code, grantType, callback) {
    request.post(googleApiTokenUrl, {form: {code: code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: REDIRECT_URL, grant_type: grantType}}, function (error, rsponse, body) {
        if (error) {
            return console.error('google oauth token fail:', error);
        }

        var statusCode = rsponse.statusCode;

        if (statusCode != 200) {
            return console.error('google oauth token fail statusCode :', error);
        } else {
            var accessToken = JSON.parse(body).access_token;

            var googleApiUserInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';
            callback(googleApiUserInfoUrl, accessToken);
        }
    });
}
exports.googleOAuthCallback = function (req, res) {
    var code = req.query.code;
    var grantType = 'authorization_code';
    var googleApiTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    getToken(googleApiTokenUrl, code, grantType, function(googleApiUserInfoUrl, accessToken){
        getUserInfo(googleApiUserInfoUrl, accessToken, function (result) {
            saveUser(result, accessToken, function () {
                res.send("");
            });
        });
    });
};