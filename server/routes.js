/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
var express = require('express');
var library = require('./api/library');
var q = require('q');
var fs = require('fs');
module.exports = function(app) {
  app.use(express.static(__dirname + '/public'));
  // Insert routes below
  app.get('/api/branches', function(req, res) {
    q(library.getBranches()).then(function(branches) {
      res.json(branches);
    });
  });
  app.get('/api/branches/id/:id', function(req, res) {
    var branch = library.getBranches().filter(function(x) {
      return x['Code'] == req.params.id;
    });
    if (branch.length == 1) {
      res.json(branch[0]);
    } else {
      res.status(404);
      res.send('Not found');
    }
  });

  app.get('/api/branchinfo', function(req, res) {
    var url = decodeURIComponent(req.query.url);
    if (url && url.match(/^http:\/\/www.torontopubliclibrary.ca\//)) {
      q(library.getBranchInfoFromURL(url)).then(function(list) {
        res.json(list);
      }).catch(function(err) {
        console.log(err);
        res.status(500);
        res.send(err);
      });
    } else {
      res.status(400);
      res.send('Please specify a Toronto Public Library search url');
    }
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
