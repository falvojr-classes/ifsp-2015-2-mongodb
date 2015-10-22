/**
 * Created by falvojr on 21/10/15.
 */
'use strict';

var Schema = require('mongoose').Schema;

module.exports = function() {
    var ParticipantSchema = new Schema({
        name: { type: String, required: true },
        twitter: { type: String, required: true },
        loc: {
            type: { type: String },
            coordinates: []
        }
    });
    ParticipantSchema.index({ loc : '2dsphere' });

    // define a method to find the closest participant
    ParticipantSchema.methods.findClosest = function(callback) {
        return this.model('Participant').find({
            loc : { $near : this.loc }, // filter by near location
            name : { $ne : this.name }  // filter by not equal related participant name
        }).limit(1).exec(callback);
    };

    db.model('Participant', ParticipantSchema);
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