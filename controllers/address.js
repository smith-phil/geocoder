'use strict';


function newaddress() 
{
    var addressModel = require('../models/addressModel');
    var address = new addressModel('./db/geocode.sqlite3');

    this.findByAddress = (req,res) => {
        // find by a full address
        address.getAddress(req.body.address, (result) => {
            if(result) {
                res.status(200).json(result);
            } else {
                res.writeHead(404);
            }

        });
    }

    this.findByCounty = (req,res) => {
        // find by a county   
        let county = req.params.county_name;
        address.getCounty(county, (result)=>{
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(404);
            }

        });
    }

    this.findByTownland = (req,res) => {
        // find by a given townland
        let townland = req.params.townland_name;
        address.getTownland(townland, (result)=>{
            res.status(200).json(result);
        });
        
    }

}


module.exports=newaddress;