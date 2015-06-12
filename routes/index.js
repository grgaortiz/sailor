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
    var skip = 0;
    fs.readFile('data/test_hospitals.csv', 'utf8', function (error, data) {
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
                        markers.push(['' + name + '', lat, long]);
                    }
                }
                skip++;
                if(skip === 3) {
                    res.render('map',
                        {title: 'Sailor', markers: markers}
                    );
                }
            }
        });
    });
};
