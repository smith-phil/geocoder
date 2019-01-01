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

    /*
     * function: executeGet
     * executes a given query against the db
     * Args: query - the query to execute  
     *       callback - the callback method to pass the result set too
     */
    var executeGet = (query, callback) => {
        db.serialize(()=> {
           db.get(query, (err, row) => {
                callback(row);
            });
        })
    }

    /*
     * function: executeGet
     * executes a given query against the db
     * Args: query - the query to execute  
     *       callback - the callback method to pass the result set too
     */
    var executeAll = (query, callback) => {
        db.serialize(()=> {
           db.all(query, (err, result) => {
                callback(result);
            });
        })
    }

    /* function: getCounty 
     * Return the coordinates for a given county name, this can be multiple coordinates 
     * Arguments: county - the county name
     *            callback - the callback method to pass the result set too 
    */
    this.getCounty = (county, callback) => {
        // Sql query to get X, Y coordinates for the given county name    
        var query = `select Y AS latitude,X as longitude from Centroid c 
            join CentroidCounty cc on c.CentroidId = cc.CentroidId 
            join County ct on cc.CountyId = ct.CountyId
            where ct.County = '${county.toUpperCase()}'`;
            
        executeGet(query, callback);
    };

    /*
     * function: getTownland
     * Return the coordinates for a given townland name
     * Args: townland - the townland name
     *       callback - the callback method to pass the result set too 
     */
    this.getTownland = (townland, callback) => {
        var query = `select Y AS latitude,X as longitude, t.English_Name as 'Townland', cty.County  from Centroid c 
            join CentroidTownland ct on c.CentroidId = ct.CentroidId 
            join Townland t on t.TownlandId = ct.TownlandId
            join County cty on t.CountyId = cty.CountyId
            where t.English_Name = '${townland.toUpperCase()}'`
        executeAll(query,callback);
    };
    this.all = (query) => {
        db.all(query, (err, rows) => {

        })
    }

    this.close = () => {
            db.close();
        }
    
   
}

module.exports = newdb;