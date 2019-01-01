'use strict';


function newaddress() 
{
    var addressModel = require('../models/addressModel');
    var address = new addressModel('./db/geocode');

    this.findByAddress = (req,res) => {
        // find by a full address
    
        res.send('Find by full address called');
    }

    this.findByCounty = (req,res) => {
        // find by a county   
        let county = req.query.county;
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
        let townland = req.query.townland;
        address.getTownland(townland, (result)=>{
            
            res.status(200).json(result);
        });
        
    }


    

}


module.exports=newaddress;