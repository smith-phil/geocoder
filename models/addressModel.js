'use strict';

function newdb (pathToDb) {
    
    var sqlite = require('sqlite3').verbose();
    var opened = false;
    var db = new sqlite.Database(pathToDb, sqlite.OPEN_READONLY, (err) => {
        if(err){
            console.log(err);
        }
        else {
            console.log('db opened');
            opened = true;
        }
    });
    this.db = db;

    /*
     * Function: executeGet
     * executes a given query against the db
     * Args: query - the query to execute  
     *       callback - the callback method to pass the result set too
     * Notes: the result in this case will only be the first record
     */
    const executeGet = (query, callback) => {
        db.serialize(()=> {
           db.get(query, (err, row) => {
                callback(row);
            });
        });
    }

    const getAllAsync = function(query) {
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.all(query, (err, result) => {
                    if(err)
                        reject(err);
                    else 
                        resolve(result);
                })
            });
        })
    }


    /* 
     * Function: getCounty 
     * Return the coordinates for a given county name, this can be multiple coordinates 
     * Arguments: county - the county name
     *            callback - the callback method to pass the result set too 
    */
    this.getCounty = (county) => {
        return new Promise((resolve,reject)=> {
            const query = `select Y AS latitude,X as longitude, ct.County from Centroid c 
            join CentroidCounty cc on c.CentroidId = cc.CentroidId 
            join County ct on cc.CountyId = ct.CountyId
            where ct.County = '${county}'
            COLLATE NOCASE`;
            getAllAsync(query)
                .then((result)=>{
                    if(result){
                        resolve(result);
                    } else {
                        reject({status:404,message:'Not Found'});
                    }
                })
                .catch((error)=>{
                    reject(error);
                })
        })
       
    };

    /*
     * function: getTownland
     * Return the coordinates for a given townland name
     * Args: townland - the townland name
     *       
     */
    this.getTownland = (townland) => {
        return new Promise((resolve,reject) => {
            const query = `select Y AS latitude,X as longitude, t.English_Name as 'Townland', cty.County from Centroid c 
                join CentroidTownland ct on c.CentroidId = ct.CentroidId 
                join Townland t on t.TownlandId = ct.TownlandId
                join County cty on t.CountyId = cty.CountyId
                where t.English_Name = '${townland}'
                COLLATE NOCASE
                OR t.Irish_Name = '${townland}'
                COLLATE NOCASE
                order by cty.County`
            getAllAsync(query)
                .then((result)=>{
                    if(result){
                        resolve(result);
                    } else {
                        reject({status:404,message:'Not Found'});
                    }
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    };

    /*
     * Function: getAddress
     * Returns a json object with the coordinates for a given address, the townland name for those coords, and the county
     * Args: the address in question
    */
    this.getAddress = (address) => {
        
        return new Promise((resolve,reject)=> {
            // split the address taking care of special characters like (, periods and ) are removed
            const addElems = address.replace(/[.)]/g, "").replace("(",",").split(",");
            // get the county first, in a production ready application this would have to be validated
            const county = addElems[addElems.length - 1].trim();
            const i = 0;

            const selectTownland = (count) => {
                const townland = addElems[count].trim();
                // query is the SQL be executed (COLLATE NOCASE means the query is case insensitive)
                const query = `select Y AS latitude,X as longitude, t.English_Name as 'Townland', cty.County from Centroid c 
                join CentroidTownland ct on c.CentroidId = ct.CentroidId 
                join Townland t on t.TownlandId = ct.TownlandId
                join County cty on t.CountyId = cty.CountyId
                where cty.County = '${county}'
                COLLATE NOCASE
                AND t.English_Name = '${townland}'
                COLLATE NOCASE
                OR t.Irish_Name = '${townland}'
                COLLATE NOCASE
                order by cty.County`; 
                // get all async using a promise
                getAllAsync(query).then((val)=>{
                    if(!val) {
                        if(count +1 < addElems.length) 
                        {   // recurse through the elements of the address before county
                            selectTownland(count +1 );
                        } else {
                            reject( {status:404, message:'Not Found'}); // return null
                        }
                    } else {
                        resolve(val);
                    }
                })
                .catch((error)=>{
                    reject(error);
                })
            }
            selectTownland(0 );
        })
    }



    this.close = () => {
            db.close();
        }
    
   
}

module.exports = newdb;