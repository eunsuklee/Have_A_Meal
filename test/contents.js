/**
 * Created by eslee on 14. 4. 19.
 */
var request = require('request');
var assert = require('assert');
var queryString = require('querystring');
var fs = require('fs');
var TEST_URL = "http://localhost:3000/"
describe('Contents', function() {
    describe('CRUD', function() {
        it.skip('insert success', function(done) {
;           var param = {form: {
                            userId : 'anneprogramer@gmail.com',
                            isPublicity : true,
                            recruitStartDateTime : new Date(2014,05,19,14,00),
                            recruitEndDateTime : new Date(2014,05,21,15,00),
                            foodType : 1,
                            subject : "글 등록 테스트1",
                            contents : "글 등록 내용 테스트2",
                            gpsX : 128,
                            gpsY : 46,
                            meetingDateTime : new Date(2014,05,23,16,00),
                            count : 10,
                            fee : 10000
                         }};
            request.post(TEST_URL + "contents", param, function (error, rsponse, body) {
                if (error) {
                    return console.error( error);
                }
               var result = JSON.parse(body).result;
                assert.equal("success", result);
                done();
            });
        });

        it.skip('update success', function(done) {
             var param = {form: {
                isPublicity : false,
                recruitStartDateTime : new Date(2015,04,19,14,00),
                recruitEndDateTime : new Date(2015,04,21,15,00),
                foodType : 1,
                subject : "글 수정 테스트",
                contents : "글 수정 내용 테스트",
                gpsX : 100,
                gpsY : 20,
                meetingDateTime : new Date(2014,05,23,16,00),
                count : 20,
                fee : 3000,
                modifiyDateTime : new Date()
            }};
            request.put(TEST_URL + "contents/5352356fe5b52be018ecbcd4", param, function (error, rsponse, body) {
                if (error) {
                    return console.error( error);
                }
                var result = JSON.parse(body).result;
                assert.equal("success", result);
                done();
            });
        });
        it('fileUpload success', function() {

            var r = request.post(TEST_URL + 'fileUpload', function optionalCallback (err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                console.log('Upload successful!  Server responded with:', body);
            })
            var form = r.form();
            form.append('uploadFile', fs.createReadStream('c:/ari.png')) ;

        });
    });
    it.skip('delete success', function(done) {
        request.del(TEST_URL + "contents/535223267d2d5d6411255859", function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }
            var result = JSON.parse(body).result;
            assert.equal("success", result);
            done();
        });
    });

    it.skip('searchOne success', function(done) {
        request.get(TEST_URL + "contents/535228e03f8f3aa00ff3b240", function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal('535228e03f8f3aa00ff3b240', result._id);
            done();
        });
    });

    it.skip('search success', function(done) {
        var param = {userId : 'anneprogramer@gmail.com', orderName : 'registerDateTime', order : 'desc', limit : '2' };
        request.get(TEST_URL + "contents?" + queryString.stringify(param), function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal(2, result.length);
            done();
        });
    });
    it.skip('search by PerPage success', function(done) {
        var param = {orderName : 'registerDateTime', order : 'desc' };
        request.get(TEST_URL + "contents/10/1?" + queryString.stringify(param), function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal(3, result.length);
            done();
        });
    });
    it.skip('best search success', function(done) {
        var param = {userId : 'anneprogramer@gmail.com'};
        request.get(TEST_URL + "contents?" + queryString.stringify(param), function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal(3, result.length);
            done();
        });
    });
});

describe('ReplyContents', function() {
    describe('CRUD', function() {
        it.skip('insert success', function(done) {
            var param = {form: {
                userId : 'anneprogramer@gmail.com',
                contents : "댓글 등록 내용 테스트",
                parentContentsId : '5352356fe5b52be018ecbcd4'
            }};
            request.post(TEST_URL + "replyContents", param, function (error, rsponse, body) {
                if (error) {
                    return console.error( error);
                }
                var result = JSON.parse(body).result;
                assert.equal("success", result);
                done();
            });
        });

        it.skip('update success', function(done) {
            var param = {form: {
                contents : "댓글 수정 내용 테스트",
                modifiyDateTime : new Date()
            }};
            request.put(TEST_URL + "replyContents/535b5517e42710501b1ff44c", param, function (error, rsponse, body) {
                if (error) {
                    return console.error( error);
                }
                var result = JSON.parse(body).result;
                assert.equal("success", result);
                done();
            });
        });
    });
    it.skip('delete success', function(done) {
        request.del(TEST_URL + "replyContents/535b5517e42710501b1ff44c", function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }
            var result = JSON.parse(body).result;
            assert.equal("success", result);
            done();
        });
    });

    it.skip('searchOne success', function(done) {
        request.get(TEST_URL + "replyContents/535b560fe42710501b1ff44d", function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal('535b560fe42710501b1ff44d', result._id);
            done();
        });
    });

    it.skip('search success', function(done) {
        var param = {parentContentsId : '5352356fe5b52be018ecbcd4'};
        request.get(TEST_URL + "replyContents?" + queryString.stringify(param), function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            console.log(result);
            assert.equal(2, result.length);
            done();
        });
    });
});