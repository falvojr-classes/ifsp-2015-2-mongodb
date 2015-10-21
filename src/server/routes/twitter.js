/**
 * Created by falvojr on 21/10/15.
 */
module.exports = function(app) {
    var Twit = require('twit');

    var oAuthConfig = {
        consumer_key: 'lOURYKnqhv6ucx9Jqz7IQuou0'
        , consumer_secret: 'rl2DTkP1wXInxg2ujATsFSvrmIsbEjBQZP1WrzwIDiMxJEBIfG'
        , access_token: '2369619440-iReV9lBs9FlISBKkSYPaD1XhOu7CeVUl0l4iVwJ'
        , access_token_secret: 'MjXYA8xOfm0GEHmZFpuTo94wVPjCH9ic80YLN3KxlpKRK'
    };

    var T = new Twit(oAuthConfig);

    // filter the public stream by all tweets containing #SNCT2015
    var stream = T.stream('statuses/filter', { track: '#SNCT2015' });

    stream.on('tweet', function (tweet) {
        console.log(tweet)
    })
};
