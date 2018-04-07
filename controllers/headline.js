var mongojs = require("mongojs");
var databaseUrl = "scrapper";
var collections = ["scrapedData"];
var express = require("express");
var db = require("../models/Headline.js");



var app = express();

app.get("/headlines", function(req, res) {
  // Grab every document in the Headlines collection
  db.Headline.find({})
    .then(function(dbHeadline) {
      // If we were able to successfully find Headlines, send them back to the client
      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
 module.exports = app;
