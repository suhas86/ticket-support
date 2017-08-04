var mongoose = require('mongoose');
var express = require('express');

var userRouter = express.Router();
var userModel = mongoose.model('User');

var responseGenerator = require('./../../libs/responseGenerator');
var myMailer = require('./../../libs/sendMail');
var config = require('./../../config/database');
var jwt = require('jwt-simple');
// pass passport for configuration
var passport	= require('passport');
require('./../../config/passport')(passport);
module.exports.controller = function (app) {

    userRouter.post('/signup', function (req, res) {
        if (req.body.firstName != undefined && req.body.lastName != undefined &&
            req.body.password != undefined && req.body.email != undefined) {
            var newUser = new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: req.body.password
            });

            newUser.save(function (err) {
                if (err) {
                    var myResponse = responseGenerator.generate(true,
                        "Oops some went wrong " + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    var token = jwt.encode(newUser, config.secret);
                    var myResponse = responseGenerator.generate(false, "",
                        200, newUser);
                    myResponse.token = 'JWT ' + token;
                    myMailer.sendMail("Welcome",
                        "Welcome to Ticket Support. Please let us know how can we help you",
                        newUser.email);
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
            userModel.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) {
                    var myResponse = responseGenerator.generate(true, "Oops Something Went Wrong " + err,
                        500, null);
                    res.send(myResponse);
                } else if (!user) {
                    var myResponse = responseGenerator.generate(true, "Please check the email provided ",
                        404, null);
                    res.send(myResponse);
                } else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            var token = jwt.encode(user, config.secret);
                            // return the information including token as JSON
                            var myResponse = responseGenerator.generate(false, "",
                                200, user);
                            myResponse.token = 'JWT ' + token;
                            res.send(myResponse);
                        } else {
                            var myResponse = responseGenerator.generate(true, "Please check your password ",
                                404, null);
                            res.send(myResponse);
                        }
                    });
                }
            })
        } else {
            var myResponse = responseGenerator.generate(true,
                "Please enter mandatory fields", 403, null);
            res.send(myResponse);
        }

    });
    //Get user by Id
   /* userRouter.get('/profile/:id',
     function (req, res) {
 
        userModel.findOne({
                '_id': req.params.id
            },
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
                        res.send(myResponse);
                    }
                }
            });
    });*/

   /* userRouter.get('/profile/:id', passport.authenticate('jwt', {
        session: false
    }), function (req, res) {
        var token = responseGenerator.getToken(req.headers);
        console.log("Token generated ", token)
        var cook = responseGenerator.cookieExtractor(req);
        console.log("Cookie generated ", cook)
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            userModel.findOne({
                name: decoded.name
            }, function (err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({
                        success: false,
                        msg: 'Authentication failed. User not found.'
                    });
                } else {
                    userModel.findOne({
                            '_id': req.params.id
                        },
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
                                    res.send(myResponse);
                                }
                            }
                        });
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                msg: 'No token provided.'
            });
        }
    });*/
    userRouter.get('/profile/:id', passport.authenticate('jwt', { session: false }), function(req, res) {  
       console.log("Inside ",req.user)
        userModel.findOne({
                '_id': req.params.id
            },
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
                        res.send(myResponse);
                    }
                }
            });
    });

    //Update Profile
    userRouter.put('/profile/:id/update', passport.authenticate('jwt', { session: false }),
        function (req, res) {
            var update = req.body;
            userModel.findOneAndUpdate({
                    _id: req.params.id
                }, update, {
                    new: true
                },
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

        })

    app.use('/users', userRouter);
}