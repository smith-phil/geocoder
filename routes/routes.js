'use strict';

/*
 * routes.js - defines and exports the routes for the REST API
 */

module.exports = (app) => {
    var addressController = require('../controllers/address');
    var address = new addressController();
    app.route('/address')
        .post(address.findByAddress);

    app.route('/townland/:townland_name')
        .get(address.findByTownland);

    app.route('/county/:county_name')
        .get(address.findByCounty);
    
};