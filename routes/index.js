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

    res.render('map',
        { title : 'Sailor' }
    );

};
