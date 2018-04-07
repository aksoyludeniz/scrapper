var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");
var db = require("../models");


var app = express();

app.get('/', function (req, res){
  res.redirect('/headlines');
})

app.get("/scrape", function(req,res) {
    console.log("hello");
  axios.get("http://www.nytimes.com").then(function(response) {

    var $ = cheerio.load(response.data);



    $("h2.story-heading").each(function(i, element) {
      // $("p.summary").each(function(i, element) {
          console.log(element);

            var result = {};
        // result.title = $(this)
        //  .children("a")
        //  .html();
        // result.link = $(this)
        //  .children("a")
        //  .attr("href");

        var title = $(element).text();

    var link = $(element).children().attr("href");

    result.title = title;
    result.link = link;



    // result.headlineSnippet = headlineSnippet;

       db.Headline.create(result)
       .then(function(dbHeadline) {
        console.log("sucessful save");
         console.log(dbHeadline);
       })
        .catch(function(err){
          console.log(err);

          return res.json(err);
        // });
    });
    res.send("scrape commplete");
  });
});

 res.redirect("/");
  });

  module.exports = app;
