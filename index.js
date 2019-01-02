'use strict';

var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }))
routes(app);

app.listen(port);
