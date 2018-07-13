module.exports = function(app, path) {
    var publicPath = __dirname + "/../public/";

    app.get("/", function (req, res) {
        res.sendFile(path.join(publicPath , "home.html"));
    });
    
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(publicPath, "survey.html"));
    });
};