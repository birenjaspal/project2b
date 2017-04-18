var mongoose = require('mongoose');

var transceiverSchema = mongoose.Schema({
    type: String,
    model: String,
    wirelessRange: String,
    power: String,
    location: String
});

var Transceiver = mongoose.model('Transceiver', transceiverSchema);


//uncomment the following code to populate, then recomment
// var transceiverData = require('../populateTransceivers.js');
// console.log(transceiverData);
// Transceiver.collection.insertMany( transceiverData,
//   function( err, data ) {
//     console.log( "added provided transceiver data" );
//     mongoose.connection.close();
//   }
// );

module.exports = Transceiver;
