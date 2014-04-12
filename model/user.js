var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("db open!");
});

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    accessTocken: String
});

mongoose.model('User', userSchema);
