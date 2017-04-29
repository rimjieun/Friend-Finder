var express = require("express");
var bodyParser = require("body-parser");
var htmlRoutes = require("./app/routing/htmlRoutes");
var apiRoutes = require("./app/routing/apiRoutes");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, function() {
  console.log("Listening to http://localhost:" + PORT);
});