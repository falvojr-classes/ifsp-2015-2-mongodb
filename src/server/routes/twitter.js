/**
 * Created by falvojr on 21/10/15.
 */
var constants = require('../comum/constants')
    , Twit = require('twit');

// call function for creating of the schema
require('../data/model.js')();

var Participant = db.model('Participant');

module.exports = function() {

    var T = new Twit(constants.TWITTER_OAUTH_CREDENTIAL);

    // filter the public stream by all tweets containing #SNCT2015
    var stream = T.stream('statuses/filter', { track: '#SNCT2015' });

    stream.on('tweet', function (tweet) {
        // the inner coordinates array is formatted as geoJSON (longitude first, then latitude).
        var geoJSON = tweet.coordinates;
        if (geoJSON) {
            var participant = {
                name: tweet.user.name,
                twitter: tweet.user.screen_name,
                loc: geoJSON
            }
            Participant.create(participant);
        } else {
            console.log(tweet.user.screen_name + " not turned on the exact localization.");
        }
    })
};
