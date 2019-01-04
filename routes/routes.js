'use strict';

/*
 * routes.js - defines and exports the routes for the REST API
 */

module.exports = (app) => {
    var addressController = require('../controllers/address');
    var address = new addressController();
    app.route('/api/address')
        .post(address.findByAddress);

    app.route('/api/townland/:townland_name')
        .get(address.findByTownland);

    app.route('/api/county/:county_name')
        .get(address.findByCounty);
    
};