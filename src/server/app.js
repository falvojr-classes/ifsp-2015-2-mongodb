/**
 * Created by falvojr on 21/10/15.
 */
'use strict';

var mongoose = require('mongoose')
    , express = require('express')
    , bodyParser = require('body-parser')
    , compress = require('compression')
    , cors = require('cors')
    , morgan = require('morgan')
    , serveFavicon = require('serve-favicon')
    , constants = require('./comum/constants');

global.db = mongoose.createConnection(constants.DB_URI, constants.DB_CREDENTIAL);

var app = express();                                // provides express structure for app
app.use(bodyParser.urlencoded({extended: true}));   // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                         // parse application/json
app.use(compress());                                // compress response data with gzip
app.use(morgan("combined"));                        // create "middleware" using combined format to STDOUT
app.use(serveFavicon(__dirname + '/favicon.ico'));  // configure favicon file
app.use(cors());                                    // enable ALL CORS requests

//
require('./routes/twitter')();

var routes;


console.log('Servindo ' + './src/client/ e ./');
app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));

app.get('/ping', function (req, res) {
    console.log(req.body);
    res.send('pong');
});

var port = process.env.PORT || 7200;
app.listen(port, function () {
    console.log('Express server escutando na porta ' + port + '(' + app.get('env') + ')');
});