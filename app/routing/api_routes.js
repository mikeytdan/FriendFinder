var friends = require('../data/friend');

module.exports = function(app) {
    var publicPath = __dirname + "/../public/";

    app.get("/api/friends", function (req, res) {
        res.json(friends.friends());
    });
    
    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        var name = req.body.name;
        var photo = req.body.photo;
        var scores = req.body.scores;
        // TODO: Handle invalid data
        var friend = friends.addFriend(name, photo, scores);
        console.log(friend);
        res.json(friend)
    });
};