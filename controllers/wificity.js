var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Users = require('../models/users.js');
var Applications = require('../models/applications.js');
var Transceivers = require('../models/transceivers.js');

///////////////////////////Application Routes////////////////////////////////////
//get route for displaying index of applications
router.get('/applications', function(req, res){
  Applications.find({}, function(error, allApplications){
      res.render('applications/index.ejs', {
          applications: allApplications
      });
  });
});

//get route for creating new application
router.get('/applications/newapplication', function(req, res){
    res.render('applications/new.ejs');
});

//post route for creating new application
router.post('/applications', function(req, res){
    Applications.create(req.body, function(){
        res.redirect('/wificity');
    });
});


//get route for displaying index of applications
router.get('/applications/index', function(req, res){
  Applications.find({}, function(error, allApplications){
      res.render('applications/index.ejs', {
          applications: allApplications
      });
  });
});

//delete route for deleting application
router.delete('/applications/deleteapplication/:id', function(req, res){
    Applications.findByIdAndRemove(req.params.id, function(err, data){
        res.redirect('/wificity')
    });
});

//get route for editing application
router.get('/applications/:id/edit', function(req, res){
    Applications.findById(req.params.id, function(err, foundApplication){ //find the application
        res.render(
    		'applications/edit.ejs',
    		{
    			application: foundApplication //pass in found application
    		}
    	);
    });
});

//put route for editing application
router.put('/applications/:id', function(req, res){
    //{new: true} tells mongoose to send the updated model into the callback
    Applications.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedModel){
        res.redirect('/wificity');
    });
});

//get route for showing application detail
router.get('/applications/:id', function(req, res){
    Applications.findById(req.params.id, function(err, foundApplication){
        res.render('applications/show.ejs', {
            application:foundApplication
        });
    });
});

//////////////////////////Transceiver Routes/////////////////////////////////////
//get route for creating new transceiver
router.get('/transceivers/newtransceiver', function(req, res){
    res.render('transceivers/new.ejs');
});

//post route for creating new transceiver
router.post('/transceivers', function(req, res){
    Transceivers.create(req.body, function(){
        res.redirect('/wificity');
    });
});


//get route for displaying index of transceivers
router.get('/transceivers/index', function(req, res){
  Transceivers.find({}, function(error, allTransceivers){
      res.render('transceivers/index.ejs', {
          transceivers: allTransceivers
      });
  });
});

//delete route for deleting transceiver
router.delete('/transceivers/deletetransceiver/:id', function(req, res){
    Transceivers.findByIdAndRemove(req.params.id, function(err, data){
        res.redirect('/wificity')
    });
});

//get route for editing transceiver
router.get('/transceivers/:id/edit', function(req, res){
    Transceivers.findById(req.params.id, function(err, foundTransceiver){ //find the transceiver
        res.render(
    		'transceivers/edit.ejs',
    		{
    			transceiver: foundTransceiver //pass in found transceiver
    		}
    	);
    });
});

//get route for showing transceiver detail
router.get('/transceivers/:id', function(req, res){
    Transceivers.findById(req.params.id, function(err, foundTransceiver){
        res.render('transceivers/show.ejs', {
            transceiver:foundTransceiver
        });
    });
});

//put route for editing transceiver
router.put('/transceivers/:id', function(req, res){
    //{new: true} tells mongoose to send the updated model into the callback
    Transceivers.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedModel){
        res.redirect('/wificity');
    });
});


///////////////////////////////////////////////////////////
//User Route
router.post('/', function(req, res){
    Users.create(req.body, function(){
        res.redirect('/wificity');
    });
});

//get route for creating new application
router.get('/map', function(req, res){
    res.render('map/footprintmap.ejs');
});

module.exports = router;
