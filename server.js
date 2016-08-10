var path = require('path');
var express = require('express');
var logger = require("morgan");
var bodyParser = require('body-parser');
var cors = require('cors');
var repository = require('./repository.js');

var startApiServer = function() {
  var app = express();
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cors());

  app.get("/connectors", function(req, res) {
    var connectors = repository.getConnectors();
    res.json(connectors);
  });

  app.post("/connectors", function(req, res) {
    repository.saveConnectors(req.body);
    res.status(200);
  })

  app.get('*', function(req, res) {
    console.log("Hit other server!")
  });

  app.listen(3001, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:3001');
  });
}

exports.startApiServer = startApiServer;
