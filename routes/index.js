/*
 * routes/index.js
 *
 * Routes contains the functions (callbacks) associated with request urls.
 */

// our db model
var Person = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

exports.index = function (req, res) {

    // Multiple Markers
    var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755]
    ];

    res.render('map',
        { title : 'Sailor', markers: markers }
    );

};
