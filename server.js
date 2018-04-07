var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var PORT = process.env.PORT || 3000;

var app = express();
//
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "home" }));
app.set("view engine", "handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "saved" }));
// app.set("view engine", "handlebars");
app.use(logger("dev"));

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



require("./routes/api/routes.js")(app);

var fetch = require("./controllers/fetch.js");
var headline = require("./controllers/headline.js");
var note = require("./controllers/note.js");

app.use("/", fetch);
app.use("/", headline);
app.use("/", note);
// app.use(routes);

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scrapper", {

});


app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
