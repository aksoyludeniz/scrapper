var mongojs = require("mongojs");
var databaseUrl = "scrapper";
var collections = ["scrapedData"];
var express = require("express");
var db = require("../models");



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

app.get("/headlines/:id", function(req, res){

  db.article.findOne({_id: req.params.id })

     .populate("note")
     .then(function(dbHeadline) {

       res.json(dbHeadline);
     })
     .catch(function(err) {
       res.json(err);
     });
});

app.post("/headlines/:id", function(req, res) {
  db.Note.create(req.body)
   .then(function(dbNote) {
     return db.Headline.findOneAndUpdate({_id:req.params.id}, { note: dbNote._id}, {new: true});
   })
    .then(function(dbHeadline){
      res.json(dbHeadline);
    })
     .catch(function(err){
       res.json(err);
     });
});
 module.exports = app;
