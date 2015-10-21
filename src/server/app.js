/**
 * Created by falvojr on 21/10/15.
 */
'use strict';

var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , compress = require('compression')
    , cors = require('cors')
    , serveFavicon = require('serve-favicon')
    , morgan = require('morgan')
    , port = process.env.PORT || 7200
    , routes;

app.use(bodyParser.urlencoded({extended: true}));   // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                         // parse application/json
app.use(compress());                                // compress response data with gzip
app.use(morgan("combined"));                       // create "middleware" using combined format to STDOUT
app.use(serveFavicon(__dirname + '/favicon.ico'));  // configure favicon file
app.use(cors());                                    // enable ALL CORS requests

routes = require('./routes/twitter')(app);

console.log('Servindo ' + './src/client/ e ./');
app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));

app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.listen(port, function () {
    console.log('Express server escutando na porta ' + port + '(' + app.get('env') + ')');
});