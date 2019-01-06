'use strict';


function newaddress() 
{
    const addressModel = require('../models/addressModel');
    const address = new addressModel('./db/geocode.sqlite3');

    /*
     * function: findByAddress - handles requests for an address
     * Returns: a JSON object representing the coordinates and the specific townland, plus the county
     *          or a 404 - not Found error if the address isn't found
     */
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

    /*
     * function: findByCounty - handles requests for a given county
     * Returns: a JSON object representing the coordinates and the specific county 
     *          or a 404 - not Found error if the address isn't found
     */
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

    /*
     * function: findByTownland - handles requests for an townland name
     * Returns: a JSON object representing the coordinates and the specific townland, plus the county
     *          or a 404 - not Found error if the address isn't found
     * Note: More than one townland may be found in the database
     */

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