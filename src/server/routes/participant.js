/**
 * Created by falvojr on 22/10/15.
 */
'use strict';

var Participant = db.model('Participant');

module.exports = function (app) {

    app.get('/api/geo-tweet', findAll);

    app.get('/api/geo-tweet/:id', findById);

    app.get('/api/geo-tweet/closest/:id', findClosest);

    function findAll(req, res, next) {
        Participant.find({ },function(err, participants) {
            if(err){
                console.error(err);
            } else {
                res.send(participants);
            }
        });
    }

    function findById(req, res, next) {
        Participant.find({_id: req.params.id}, function(err, participants) {
            if(err){
                console.error(err);
            } else {
                 res.send(participants);
            }
        });
    }

    function findClosest(req, res, next) {
        Participant.find({_id: req.params.id}, function(err, participants) {
            if(err){
                console.error(err);
            } else if (participants.length == 0) {
                res.send(participants);
            } else {
                var participant = participants[0];
                console.log(participant);
                participant.findClosest(function (err, closest) {
                    if (err) {
                        console.error(err);
                    } else {
                        res.send(closest);
                    }
                });
            }
        });
    }
};