/**
 * Created by falvojr on 12/10/15.
 */
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var serveFavicon = require('serve-favicon');
var morgan = require('morgan');

var environment = process.env.NODE_ENV || "dev";
var port = process.env.PORT || 7200;

app.use(bodyParser.urlencoded({extended: true}));   // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                         // parse application/json
app.use(compress());                                // compress response data with gzip
app.use(morgan(environment));                       // create "middleware" using combined format to STDOUT
app.use(serveFavicon(__dirname + '/favicon.ico'));  // configure favicon file
app.use(cors());                                    // enable ALL CORS requests

app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.listen(port, function () {
    console.log('Express server escutando na porta ' + port + '(' + app.get('env') + ')');
});