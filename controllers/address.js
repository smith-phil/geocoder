'use strict';


function newaddress() 
{
    const addressModel = require('../models/addressModel');
    const address = new addressModel('./db/geocode.sqlite3');

    this.findByAddress = (req,res) => {
        
        address.getAddress(req.body.address)
            .then((result)=> {
                res.status(200).json(result);
            })
            .catch((err)=> {
                if(err.status = 404) {
                    res.status(err.status).send(err.message);
                } else {
                    res.status(500).send('Internal Server error');
                }
            })
    }

    this.findByCounty = (req,res) => {
        // find by a county   
        const county = req.params.county_name;
        address.getCounty(county)
            .then((result)=>{
                res.status(200).json(result);    
            })
            .catch((error)=>{
                if(error.status = 404) {
                    res.status(error.status).send(error.message);
                } else {
                    res.status(500).send('Internal Server error');
                }
            })
    }

    this.findByTownland = (req,res) => {
        // find by a given townland
        const townland = req.params.townland_name;
        address.getTownland(townland)
            .then((result)=>{
                res.status(200).json(result);    
            })
            .catch((error)=>{
                if(error.status = 404) {
                    res.status(error.status).send(error.message);
                } else {
                    res.status(500).send('Internal Server error');
                }
            })
    }
    

}


module.exports=newaddress;