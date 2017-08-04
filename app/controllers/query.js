var mongoose = require('mongoose');
var express = require('express');

var queryRoute = express.Router();
var queryModel = mongoose.model('Query');

var responseGenerator = require('./../../libs/responseGenerator');
// pass passport for configuration
var passport	= require('passport');
require('./../../config/passport')(passport);
//To upload file
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        //Supported file  format
        if (!file.originalname.match(/\.(doc|docx|txt|jpg|jpeg|png)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err)
        } else {
            cb(null, Date.now() + '_' + file.originalname)
        }
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
}).single('myfile');
module.exports.controller = function (app) {

    //Raise a ticket
    queryRoute.post('/create',passport.authenticate('jwt', { session: false }), function (req, res) {
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
    queryRoute.get('/list/:id',passport.authenticate('jwt', { session: false }), function (req, res) {
        var id = req.params.id;
        queryModel.find({ userId: id }).sort({'createdAt': 'desc'}).exec(function (err, response) {
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
    queryRoute.get('/case/:id',passport.authenticate('jwt', { session: false }), function (req, res) {
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
    queryRoute.put('/case/:id/update',passport.authenticate('jwt', { session: false }), function (req, res) {
        var update = req.body;
        console.log("To be updated ",update)
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
                    //Send Mail
                    if(update.ticketStatus!=undefined) {
                        console.log("Status update");
                    } else {
                        console.log("Comment updated")
                    }  
                    res.send(myResponse);
                }
            })
    });

    //Upload file
    queryRoute.post('/upload/:id',passport.authenticate('jwt', { session: false }), function (req, res) {

        upload(req, res, function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    var myResponse = responseGenerator.generate(true,
                        "File size too large. Max limit is 10MB" + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else if (err.code === 'filetype') {
                    var myResponse = responseGenerator.generate(true,
                        "File type is invalid" + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    console.log(err);
                    var myResponse = responseGenerator.generate(true,
                        "Oops some went wrong " + err, 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                }
            } else {
                if (!req.file) {
                    var myResponse = responseGenerator.generate(true,
                        "No file was selected ", 500, null);
                    // res.send(myResponse);
                    res.send(myResponse);
                } else {
                    //Update file name to server
                    console.log("Name is", req.file.filename);
                    var data = { fileName: req.file.filename };
                    queryModel.findOneAndUpdate({ _id: req.params.id }, data, { new: true },
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
                }
            }
        })
    })

    //********************Admin Apis ********************//
    queryRoute.get('/all-list/',passport.authenticate('jwt', { session: false }), function (req, res) {

        queryModel.find({}).sort({'createdAt': 'desc'}).exec(function (err, response) {
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
    queryRoute.get('/download/:fileName',passport.authenticate('jwt', { session: false }), function (req, res) {
        var file =  './uploads/' + req.params.fileName;
        res.download(file); // Set disposition and send it.
    });

    app.use('/query', queryRoute);
}