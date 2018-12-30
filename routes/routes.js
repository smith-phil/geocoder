'use strict';

/*
 * routes.js - defines and exports the routes for the REST API
 */

module.exports = (app) => {
    var address = require('../controllers/address');

    app.route('/address')
        .get(address.find_by_address);

    app.route('/townland')
        .get(address.find_by_townland);

    app.route('/county')
        .get(address.find_by_county);
    
};