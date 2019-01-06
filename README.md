# Proof of Concept Geocoder

Geocodes Irish addresses. Irish addresses have only recently being given a post code (called an eircode). This geocoder will return GPS coordinates based on County or Townland.

## Requirements
 - NodeJs 8.10
 - Sqlite3

 ## Installation
 Clone this repository. In the terminal navigate to the root of the repo and type `npm install`. 
 Once the required node modules are installed, and the database is setup, then type `node index`.

 You'll also need to create the sqlite db, those scripts are in the sql folder.

## Structure

The entry point into the program is index.js. The basic structure follows the Model-View-Controller design pattern, but without the views as this is an API. The end points provided are:
 - http://&lt;hostname&gt;:3000/api/county/:countyname - returns a json object with the coordinates [HTTP GET]
 - http://&lt;hostname&gt;:3000/api/townland/:townland - return a array of json objects with the coordinates for all townlands with the given name [HTTP GET]
 - http://&lt;hostname&gt;:3000/api/address/ - posts and application/x-www-form-urlencoded form, name is address and the value is the address as a single comma delimited string,     returns a JSON object with the coordingates of the address to the nearest townland

In the project you have the following structure
 - contollers/address.js
 - models/addressModel.js
 - routes/routes.js
 - db
 - sql

## models/addressModel.js
Represents an address in the progam, it provides the methodology for communicating with the sqlite DB and return the address results wrapped in a promise if found, or an error if not found.

## controllers/address.js
address.js is the controller for address and provides the functionality for the api, it handles the requests and responses and communicates with the address model to retrieved from the db.

## routes/routes.js 
Handles routing of the requests to the correct controller method.

## db
This is where the db resides by default. To change the location update line 7 of address.js with the new path.

## sql
The sql files for creating the DB.





### License
This is published under4 the MIT license.

 #### Notes
 This has been developed on Ubuntu 18.04. 