# Proof of Concept Geocoder

Geocodes Irish addresses. Irish addresses have only recently being given a post code (called an eircode). This geocoder will return GPS coordinates based on County or Townland.

## Requirements
 - NodeJs 8.10
 - Sqlite3

 ## Installation
 Clone this repository. In the terminal navigate to the root of the repo and type `npm install`. 
 Once the required node modules are installed, and the database is setup, then type `node index`.

 You'll also need to create the sqlite db, those scripts are too follow.

## Structure

The entry point into the program is index.js. The basic structure follows the Model-View-Controller design pattern, but without the views as this is an API. The end points provided are:
 - <hostname>:3000/county/


## License
This is published under4 the MIT license.

 #### Notes
 This has been developed on Ubuntu 18.04. 