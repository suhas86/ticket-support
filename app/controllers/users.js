var mongoose = require('mongoose');
var express = require('express');

var userRouter = express.Router();
var userModel = mongoose.model('User');

var responseGenerator = require('./../../libs/responseGenerator');

module.exports.controller = function (app) {

    userRouter.post('/signup', function (req, res) {
        if (req.body.firstName != undefined && req.body.lastName != undefined
            && req.body.password != undefined && req.body.email != undefined) {
            var newUser = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password,
                userType: 2
            });

            newUser.save(function (err) {
                if (err) {
                    var myResponse = responseGenerator.generate(true,
                        "Oops some went wrong " + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    var myResponse = responseGenerator.generate(false, "",
                        200, newUser);
                    res.send(myResponse);

                }
            });
        } else {
            var myResponse = responseGenerator.generate(true,
                "Please enter mandatory fields", 403, null);
            res.send(myResponse);
        }
    });

    //Login Route
    userRouter.post('/login/', function (req, res) {
        
        if (req.body.email != undefined && req.body.password != undefined) {
            userModel.findOne({ $and: [{ 'email': req.body.email }, { 'password': req.body.password }] },
                function (err, foundUser) {
                    if (err) {
                        var myResponse = responseGenerator.generate(true, "Oops Something Went Wrong " + err,
                            500, null);
                        res.send(myResponse);

                    } else {
                        if (foundUser == null || foundUser == undefined) {
                            var myResponse = responseGenerator.generate(true, "Please check your email and password ",
                                404, null);
                            res.send(myResponse);

                        } else {
                            var myResponse = responseGenerator.generate(false, "",
                                200, foundUser);
                            /*
                        req.session.user = foundUser;
                        delete req.session.user.password;
                        req.user = foundUser;
                        delete req.user.password;
                        app.locals.user = req.session.user
                        */
                            res.send(myResponse);
                        }
                    }
                });
        }else {
            var myResponse = responseGenerator.generate(true,
                "Please enter mandatory fields", 403, null);
            res.send(myResponse);
        }

    });

    app.use('/users', userRouter);
}

