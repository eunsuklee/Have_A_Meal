var mongoose = require('mongoose');

var schema = {
    user : function () {
        return mongoose.Schema({
            name: String,
            email: String
        });
    }
}

mongoose.model('User', schema.user());