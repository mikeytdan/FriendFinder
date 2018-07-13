module.exports = function(app, friends) {
    var publicPath = __dirname + "/../public/";

    app.get("/api/friends", function (req, res) {
        res.json(friends.friends()); // TODO: Return friends
    });
    
    app.post("/api/friends", function (req, res) {
        res.json("Handle this!");
    });
};