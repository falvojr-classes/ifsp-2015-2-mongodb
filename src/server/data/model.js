/**
 * Created by falvojr on 21/10/15.
 */

var Schema = require('mongoose').Schema;

module.exports = function() {
    var ParticipantObject = new Schema({
        name: { type: String, required: true },
        twitter: { type: String, required: true },
        loc: {
            type: { type: String },
            coordinates: []
        }
    });
    ParticipantObject.index({ loc : '2dsphere' });

    db.model('Participant', ParticipantObject);
};

db.on('connected', function() {
    console.log('Mongoose connection connected.');
}).on('open', function() {
    console.log('Mongoose connection open.');
}).on('disconnected', function() {
    console.log('Mongoose connection disconnected.');
}).on('error', function() {
    console.log('Mongoose connection error.');
});