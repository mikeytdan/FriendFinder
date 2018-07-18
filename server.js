// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'app/public/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

require('./app/routing/html_routes')(app);
require('./app/routing/api_routes')(app);