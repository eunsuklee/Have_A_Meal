
/**
* Module dependencies.
    */
require('./db/mongodb');
require('./model/schema');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var contents = require('./routes/contents');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/googleOAuth', user.googleOAuth);
app.get('/auth/google/callback', user.googleOAuthCallback);

app.post('/contents', contents.insertContent);
app.put('/contents/:id', contents.updateContent);
app.del('/contents/:id', contents.deleteContent);
app.get('/contents', contents.searchContents);
app.get('/contents/:id', contents.searchContent);

app.post('/replyContents', contents.insertReplyContent);
app.put('/replyContents/:id', contents.updateReplyContent);
app.del('/replyContents/:id', contents.deleteReplyContent);
app.get('/replyContents', contents.searchReplyContents);
app.get('/replyContents/:id', contents.searchReplyContent);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
