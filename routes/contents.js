var mongoose = require('mongoose');
var Contents = mongoose.model('Contents');
var ReplyContents = mongoose.model('ReplyContents');
var fs = require('fs');

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
    var options  = {};

    if (param.orderName != null) {
        var orderName = param.orderName;
        var order = param.order;
        var orders = {}
        orders[orderName] = order;
        options['sort'] = orders ;
        delete req.query.order;
        delete req.query.orderName;
    }

    if (param.limit != null) {
        options['limit'] = param.limit ;
        delete req.query.limit;
    }
    Contents.find(
        param,
        null,
        options,
        function(error, contents){
            if (error) {
                console.error(error);
                res.send({result : 'fail'});
            }
            res.send(contents);
        });
};

exports.searchContentsByPerPage = function(req, res){
    var page = req.params.page;
    var perPage = req.params.perPage;
    var param =  req.query;
    var options  = {};

    if (param.orderName != null) {
        var orderName = param.orderName;
        var order = param.order;
        var orders = {}
        orders[orderName] = order;
        options['sort'] = orders ;
        delete req.query.order;
        delete req.query.orderName;
    }
    options['skip'] = page > 0 ? ((page-1)*perPage) : 0;
    options['limit'] = perPage;

    Contents.find(
        param,
        null,
        options,
        function(error, contents){
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

exports.insertReplyContent = function(req, res){

    var replyContents = new ReplyContents(req.body);
    replyContents.save(function (error) {
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    })
};

exports.updateReplyContent = function(req, res){
    var _id = req.params.id;
    var param = req.body
    ReplyContents.update({ _id: _id }, param, function(error){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    });
};

exports.searchReplyContents = function(req, res){
    var param =  req.query;
    ReplyContents.find(param, function(error, contents){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send(contents);
    });
};

exports.searchReplyContent = function(req, res){
    var _id = req.params.id;
    ReplyContents.findById(_id, function(error, cotent){
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send(cotent);
    });
};

exports.deleteReplyContent = function(req, res){
    var _id = req.params.id;
    ReplyContents.remove({_id : _id}, function (error) {
        if (error) {
            console.error(error);
            res.send({result : 'fail'});
        }
        res.send({result : 'success'});
    })
};

exports.fileUpload = function(req, res) {
    console.log(req.files.uploadFile);
    res.send({result : 'success'});

}