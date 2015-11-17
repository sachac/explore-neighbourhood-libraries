/**
 * Main application file
 */

'use strict';

var express = require('express');
var config = require('./config/environment');
var http = require('http');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}
// Expose app
exports = module.exports = app;
startServer();
