// GET route with url /api/friends, used to display JSON of all possible friends
// POST route /api/friends, used to handle incoming survey results
// and also to handle compatibility logic

var fs = require("fs");

var json = fs.readFileSync("app/data/friends.json");
var friendsArr = JSON.parse(json); //array of friends data

module.exports = function(app) {


  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/new/friend", function(req, res) {
    
    var newFriend = {
      name: req.body.name,
      photoURL: req.body.photoURL,
      scores: req.body.scores.map(Number)
    };

    var bestMatchList = bestMatch(newFriend);

    friendsArr.push(newFriend);

    var data = JSON.stringify(friendsArr, null, 2);
    fs.writeFile("app/data/friends.json", data);

    res.json(bestMatchList);

  });

};

function bestMatch(friend) {
  var maxDiff = 40;
  var bestMatch = [];

  for (i = 0; i < friendsArr.length; i++) {

    var totalDiff = 0;

    for (j = 0; j < friend.scores.length; j++) {
      var scoreDiff = Math.abs(friendsArr[i].scores[j] - friend.scores[j]);
      totalDiff += scoreDiff;
    }


    if (totalDiff === maxDiff) {
      var match = {
        name: friendsArr[i].name,
        photoURL: friendsArr[i].photoURL
      };

      bestMatch.push(match);

    } else if (totalDiff < maxDiff) {

      bestMatch = [
        {
          name: friendsArr[i].name,
          photoURL: friendsArr[i].photoURL
        }
      ];
      
      maxDiff = totalDiff;
    }
  }

  return bestMatch;

}