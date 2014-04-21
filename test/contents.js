/**
 * Created by eslee on 14. 4. 19.
 */
var request = require('request');
var assert = require('assert');
var querystring = require('querystring');
var TEST_URL = "http://localhost:3000/"
describe('Contents', function() {
    describe('CRUD', function() {
        it.skip('insert success', function(done) {
;           var param = {form: {
                             userId : 'anneprogramer@gmail.com',
                            isPublicity : true,
                            recruitStartDateTime : new Date(2014,04,19,14,00),
                            recruitEndDateTime : new Date(2014,04,21,15,00),
                            foodType : 1,
                            subject : "글 등록 테스트",
                            contents : "글 등록 내용 테스트",
                            gpsX : 128,
                            gpsY : 46,
                            meetingDateTime : new Date(2014,04,23,16,00),
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
                fee : 3000
            }};
            request.put(TEST_URL + "contents/535223267d2d5d6411255859", param, function (error, rsponse, body) {
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
            assert.equal('535228e03f8f3aa00ff3b240', result._id);
            done();
        });
    });

    it('search success', function(done) {
        var param = {userId : 'anneprogramer@gmail.com'};
        request.get(TEST_URL + "contents?" + querystring.stringify(param), function (error, rsponse, body) {
            if (error) {
                return console.error( error);
            }

            var result = JSON.parse(body);
            assert.equal(2, result.length);
            done();
        });
    });
});