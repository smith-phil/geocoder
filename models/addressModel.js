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
     * Function: executeGet
     * executes a given query against the db
     * Args: query - the query to execute  
     *       callback - the callback method to pass the result set too
     * Notes: the result in this case will only be the first record
     */
    var executeGet = (query, callback) => {
        db.serialize(()=> {
           db.get(query, (err, row) => {
                callback(row);
            });
        })
    }

    /*
     * Function: executeAll
     * executes a given query against the db
     * Args: query - the query to execute  
     *       callback - the callback method to pass the result set too
     * Notes: the result set is all records find
     */
    var executeAll = (query, callback) => {
        db.serialize(()=> {
           db.all(query, (err, result) => {
                callback(result);
            });
        })
    }

    /* 
     * Function: getCounty 
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
        var query = `select Y AS latitude,X as longitude, t.English_Name as 'Townland', cty.County from Centroid c 
            join CentroidTownland ct on c.CentroidId = ct.CentroidId 
            join Townland t on t.TownlandId = ct.TownlandId
            join County cty on t.CountyId = cty.CountyId
            where t.English_Name = '${townland.toUpperCase()}'
            order by cty.County`
        executeAll(query,callback);
    };

    /*
     * Function: getAddress
     * Returns the coordinates for a given address
     * Args: 
    */
    this.getAddress = (address, callback) => {
        console.log('geaddress');
        // split the address taking care of special characters like (, periods and ) are removed
        var addElems = address.replace(/[.)]/g, "").replace("(",",").split(",");
        console.log(addElems);
        // get the county first, in a production ready application this would have to be validated
        var county = addElems[addElems.length - 1].trim();
        var notFound = true;
        var i = 0;
        // for townland I'm taking a top down approach as this is more likely to give me a unique record
        for(let i = 0; i < addElems.length - 1; i++) {
            console.log(i);
            var townland = addElems[i].trim();
            var query = `select Y AS latitude,X as longitude, t.English_Name as 'Townland', cty.County from Centroid c 
            join CentroidTownland ct on c.CentroidId = ct.CentroidId 
            join Townland t on t.TownlandId = ct.TownlandId
            join County cty on t.CountyId = cty.CountyId
            where t.English_Name = '${townland.toUpperCase()}'
            and cty.County = '${county.toUpperCase()}'
            order by cty.County`;
            console.log(query)
            var found = false;
            executeAll(query, callback);
            if(found) {
                break;
            }
        }
    }

    this.all = (query) => {
        db.all(query, (err, rows) => {

        })
    }

    this.close = () => {
            db.close();
        }
    
   
}

module.exports = newdb;