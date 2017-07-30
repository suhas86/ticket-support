var mongoose = require('mongoose');
var express = require('express');

var queryRoute = express.Router();
var queryModel = mongoose.model('Query');

var responseGenerator = require('./../../libs/responseGenerator');

module.exports.controller = function (app) {

    //Raise a ticket
    queryRoute.post('/create', function (req, res) {
        //Server side validation
        if (req.body.name != undefined && req.body.email != undefined
            && req.body.mobileNumber != undefined && req.body.querySubject != undefined
            && req.body.queryContent != undefined) {

            var newQuery = new queryModel({
                name: req.body.name,
                email: req.body.email,
                userId: req.body.userId,
                mobileNumber: req.body.mobileNumber,
                querySubject: req.body.querySubject,
                queryContent: req.body.queryContent
            })

            newQuery.save(function (err) {
                if (err) {
                    var myResponse = responseGenerator.generate(true,
                        "Oops some went wrong " + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    var myResponse = responseGenerator.generate(false, "",
                        200, newQuery);
                    res.send(myResponse);
                }
            })

        } else {
            var myResponse = responseGenerator.generate(true,
                "Please enter mandatory fields", 403, null);
            res.send(myResponse);
        }
    })
    //Get User query list
    queryRoute.get('/list/:id', function (req, res) {
        var id = req.params.id;

        queryModel.find({ userId: id }, function (err, response) {
            if (err) {
                var myResponse = responseGenerator.generate(true,
                    "Oops some went wrong " + err, 500, null);
                // res.send(myResponse);
                res.send(myResponse);
            } else {
                var myResponse = responseGenerator.generate(false, "",
                    200, response);
                res.send(myResponse);
            }
        })
    })
    //Get query by id
    queryRoute.get('/case/:id', function (req, res) {
        var id = req.params.id;

        queryModel.findOne({ _id: id }, function (err, response) {
            if (err) {
                var myResponse = responseGenerator.generate(true,
                    "Oops some went wrong " + err, 500, null);
                // res.send(myResponse);
                res.send(myResponse);
            } else {
                var myResponse = responseGenerator.generate(false, "",
                    200, response);
                res.send(myResponse);
            }
        })
    })
    //Add Comment
    queryRoute.put('/case/:id/update', function (req, res) {
        var update = req.body;
        queryModel.findOneAndUpdate({ _id: req.params.id }, update, { new: true },
            function (err, response) {
                if (err) {
                    var myResponse = responseGenerator.generate(true,
                        "Oops some went wrong " + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    var myResponse = responseGenerator.generate(false, "",
                        200, response);
                    res.send(myResponse);
                }
            })
    });

    app.use('/query', queryRoute);
}