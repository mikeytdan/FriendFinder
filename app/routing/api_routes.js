var friends = require('../data/friend');

module.exports = function(app) {
    var publicPath = __dirname + "/../public/";

    app.get("/api/friends", function (req, res) {
        res.json(friends.friends());
    });
    
    app.post("/api/friends", function (req, res) {
        var name = req.body.name;
        var photo = req.body.photo;
        var scores = req.body.scores;
        var friend = friends.addFriend(name, photo, scores);
        res.json(friend)
    });
};