var exphbs = require("express-handlebars");

module.exports = function (app) {


  app.get("/",function(req, res) {
    res.render("saved");
  });

};
