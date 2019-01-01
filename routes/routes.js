'use strict';

/*
 * routes.js - defines and exports the routes for the REST API
 */

module.exports = (app) => {
    var addressController = require('../controllers/address');
    var address = new addressController();
    app.route('/address')
        .get(address.findByAddress);

    app.route('/townland')
        .get(address.findByTownland);

    app.route('/county')
        .get(address.findByCounty);
    
};