var Friend = function (name, photo, scores) {
    if (typeof name !== 'string') { throw "name must be an array" }
    if (typeof photo !== 'string') { throw "photo must be an array" }
    if (!Array.isArray(scores)) { throw "scores must be an array" }

    this.name = name.toUpperCase();
    this.photo = photo;
    this.scores = scores;
}

var friends = [];
var friendNamesAndPhotos = [
    {
        name: "Lamb Chop",
        photo: "https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg"
    }, 
    {
        name: "Shark Nado",
        photo: "https://images.pexels.com/photos/726478/pexels-photo-726478.jpeg"
    }, 
    {
        name: "Chicky Chick",
        photo: "https://images.pexels.com/photos/5143/cute-animals-easter-chicken.jpg"
    }, 
    {
        name: "Lady Dog",
        photo: "https://images.pexels.com/photos/374825/pexels-photo-374825.jpeg"
    }, 
    {
        name: "Flam Ingo",
        photo: "https://images.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg"
    }, 
    {
        name: "Mon Key",
        photo: "https://images.pexels.com/photos/50988/ape-berber-monkeys-mammal-affchen-50988.jpeg"
    }, 
    {
        name: "King Leo",
        photo: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg"
    }, 
    {
        name: "Ti Gress",
        photo: "https://images.pexels.com/photos/38278/tiger-head-wildlife-animal-38278.jpeg"
    }, 
]

for (friend of friendNamesAndPhotos) {
    var scores = [];
    for (i = 0; i < 10; i++) {
        scores.push(Math.ceil(Math.random() * 5));
    }

    friends.push(new Friend(friend.name, friend.photo, scores));
}

module.exports = {
    addFriend: function (name, photo, scores) {
        try {
            var friend = new Friend(name, photo, scores);
            friends.push(friend);
            return friend;
        } catch (error) {
            console.log(error);
        }
        return null;
    },

    friends: function () {
        return friends;
    }
};