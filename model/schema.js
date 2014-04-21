var mongoose = require('mongoose');

var schema = {
    user : function () {
        return mongoose.Schema({
            name: String,
            id: String
        });
    },
    contents : function() {
        return mongoose.Schema({
            userId : String,
            registerDateTime : { type: Date, default: Date.now },
            modifiyDateTime : { type: Date, default: Date.now },
            isPublicity : Boolean,
            recruitStartDateTime : Date,
            recruitEndDateTime : Date,
            foodType : Number,
            subject : String,
            contents : String,
            gpsX : Number,
            gpsY : Number,
            meetingDateTime : Date,
            count : Number,
            fee : Number,
            joinUsers : String,
            attachedFile : String
        });
    }
}

mongoose.model('User', schema.user());
mongoose.model('Contents', schema.contents());