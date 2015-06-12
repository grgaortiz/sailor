/*
 * routes/index.js
 *
 * Routes contains the functions (callbacks) associated with request urls.
 */

// dependencies
var fs = require('fs');
var csv = require('csv');

// our db model
var Person = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function (req, res) {

    // Params
    var markers = [];
    // Info Window Content
    var infoWindowContent = [];
    var skip = 0;
    fs.readFile('data/hospitals.csv', 'utf8', function (error, data) {
        csv.parse(data, {delimiter: ','}, function (err, data) {
            for (var key in data) {
                if (skip > 0) {
                    if (data.hasOwnProperty(key)) {
                        var row = data[key];
                        var name = row[0];
                        var address = row[1];
                        var phone = row[2];
                        var beds = row[3];
                        var system = row[4];
                        var url = row[5];
                        var lat = row[6];
                        var long = row[7];
                        var client = row[14];
                        url = url.replace('//', 'http://');
                        markers.push(['' + name + '', lat, long, client]);
                        infoWindowContent.push(['<div id="content"><div id="siteNotice"></div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                        '<div id="bodyContent"><p><b>Address:</b> ' + name + '</br><b>Phone:</b> ' + phone + '</br><b>Beds:</b> ' + beds + '</br><b>System:</b> ' + system + '</br><b>Website:</b> ' + url + '</p></div>' +
                        '</div>']);
                    }
                }
                skip++;
                if (skip === 6330) {
                    res.render('map',
                        {title: 'Sailor', markers: markers, infoWindowContent: infoWindowContent}
                    );
                }
            }
        });
    });
};
