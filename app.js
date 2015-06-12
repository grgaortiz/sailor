/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
var stylus = require('stylus');
var nib = require('nib');

// the ExpressJS App
var app = express();

/* Stylus compile */
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

// server port number
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());

// connecting to database
app.db = mongoose.connect(process.env.MONGOLAB_URI);
console.log("connected to database");

/**
 * CORS support for AJAX requests
 */

app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});


var routes = require('./routes/index.js');

app.get('/', routes.index);

// if route not found, respond with 404
app.use(function (req, res, next) {

    var jsonData = {
        status: 'ERROR',
        message: 'Sorry, we cannot find the requested URI'
    }
    // set status as 404 and respond with data
    res.status(404).send(jsonData);

});

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});