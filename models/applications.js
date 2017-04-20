var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Transceiver = require('./transceivers.js');

var applicationSchema = new Schema({
    owner: String,
    color: String,
    transceivers: [Transceiver.schema]
});

var Application = mongoose.model('Application', applicationSchema);

//uncomment the following code to populate, then recomment
var applicationData = require('../populateApplications.js');
console.log(applicationData);

Application.collection.insertMany( applicationData,
  function( err, data ) {
    console.log( "added provided application data" );
    mongoose.connection.close();
  }
);

module.exports = Application;
