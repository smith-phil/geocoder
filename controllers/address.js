'use strict';

exports.find_by_address = (req,res) => {
    // find by a full address
    res.send('Find by full address called');
}

exports.find_by_county = (req,res) => {
    // find by a county   
    res.send('Find by county called');
}

exports.find_by_townland = (req,res) => {
    // find by a given townland
    res.send('find by a given townland name');
}