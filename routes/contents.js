var mongoose = require('mongoose');
var Contents = mongoose.model('Contents');

exports.insertContent = function(req, res){

    var contents = new Contents(req.body);
    contents.save(function (error) {
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    })
};

exports.updateContent = function(req, res){
    var _id = req.params.id;
    var param = req.body
    Contents.update({ _id: _id }, param, function(error){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    });
};

exports.searchContents = function(req, res){
    var param =  req.query;

    Contents.find(param, function(error, contents){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send(contents);
    });
};

exports.searchContent = function(req, res){
    var _id = req.params.id;
    Contents.findById(_id, function(error, cotent){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send(cotent);
    });
};

exports.deleteContent = function(req, res){
    var _id = req.params.id;
    Contents.remove({_id : _id}, function (error) {
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    })
};