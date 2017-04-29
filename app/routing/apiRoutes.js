// GET route with url /api/friends, used to display JSON of all possible friends
// POST route /api/friends, used to handle incoming survey results
// and also to handle compatibility logic

var users = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(users);
  });

  app.post("/api/friends", function(req, res) {
    users.push(req.body);
  });

  app.get("/api/bestmatch", function(req, res) {
    res.json(bestMatch());
  });
};

function bestMatch() {

  var newUser = users.pop();
  var bestMatch;
  var maxDiff = 40;
  
  for (i = 0; i < users.length; i++) {

    var totalDiff = 0;

    for (j = 0; j < users[i].scores.length; j++) {
      var diff = Math.abs(users[i].scores[j] - newUser.scores[j]);
      totalDiff += diff;
    }

    if (totalDiff < maxDiff) {
      bestMatch = users[i];
      maxDiff = totalDiff;
    }
  }

  return bestMatch;

}