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

    console.log("main route requested");

    var data = {
        status: 'OK',
        message: 'node RESTful API @grgortiz'
    };

    // respond back with the data
    res.json(data);

};
