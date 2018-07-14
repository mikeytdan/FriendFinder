var questions = [
    "Like to take long walks in the park",
    "Love to cuddle",
    "Full of energy",
    "Kind and generous",
    "Calm and relaxed",
    "Goes outside a lot",
    "Goes to the park a lot",
    "Likes to travel",
    "Likes table scraps",
    "Likes being petted"
]

window.onload = function (event) {
    var surveyDiv = $("#survey");
    surveyDiv.append("<h2>About You</h2>")

    var nameGroup = $("<form-group>").appendTo(surveyDiv);
    nameGroup.append(`<label>Name:</label>`);
    nameGroup.append(`<input type="text" value="Mike" class="form-control mb-3" id="name" placeholder="Name">`);

    var photoGroup = $("<form-group>").appendTo(surveyDiv);
    photoGroup.append(`<label>Photo URL:</label>`);
    photoGroup.append(`<input type="text" value="Photo" class="form-control" id="photo" placeholder="Photo url">`);
    surveyDiv.append("<hr>");

    for (index = 0; index < questions.length; index++) {
        var question = questions[index];
        surveyDiv.append(addVoteQuestionToDiv(question, index + 1));
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#name").val().trim();
        if (name == "") {
            console.log(`Missing name`);
            return; // TODO: show error
        }

        var photo = $("#photo").val().trim();
        if (photo == "") {
            console.log(`Missing photo link`);
            return; // TODO: show error
        }

        var values = [];
        for (index = 1; index <= questions.length; index++) {
            var value = $(`input[name=question${index}]:checked`).val();
            if (value == undefined) {
                console.log(`Missing response for question ${index}`);
                return // TODO: show error
            }
            values.push(parseInt(value));
        }


        var newFriend = {
            name: name,
            photo: photo,
            scores: values
        };

        $.get("/api/friends")
            .then(function (data) {
                compare(newFriend, data)
                $.post("/api/friends", newFriend)
                    .then(function (data) {
                    });
            });
    })
}

function compare(friend, friends) {
    var bestScore = 9999;
    var myScore = friend.scores.reduce((a, b) => a + b, 0);
    var closestMatch
    for (f of friends) {
        console.log(f);
        var friendScore = f.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        var diff = Math.abs(myScore - friendScore);
        if (diff < bestScore) {
            closestMatch = f;
            bestScore = diff;
        }
    }


    console.log("Best score: " + bestScore);
    console.log("Friend");
    console.log(friend);
    console.log("Closest match");
    console.log(closestMatch);
}

function addVoteQuestionToDiv(question, index) {
    var div = $("<div>");
    div.addClass("mb-3");
    div.append($("<h2>").text(index + ": " + question));
    var control = $("<div>");
    control.addClass("form-check");
    for (value of [1, 2, 3, 4, 5]) {
        control.append($(`<input type="radio" name="question${index}" value=${value} class="form-check-input" checked="checked">`));
        var text = `${value}`;
        if (value == 1) {
            text += " Strongly Disagree";
        } else if (value == 5) {
            text += " Strongly Agree";
        }
        control.append($(`<label>${text}</label><br>`));
    }
    div.append(control);
    return div;
}