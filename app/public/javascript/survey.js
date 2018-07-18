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
    $('#match-modal').modal({ show: false})
    $('#error-modal').modal({ show: false})
    
    var surveyDiv = $("#survey");
    surveyDiv.append("<h2>About You</h2>")

    var nameGroup = $("<form-group>").appendTo(surveyDiv);
    nameGroup.append(`<label>Name:</label>`);
    nameGroup.append(`<input type="text" class="form-control mb-3" id="name" placeholder="Name">`); // TODO: remove value="Mike"

    var photoGroup = $("<form-group>").appendTo(surveyDiv);
    photoGroup.append(`<label>Photo URL:</label>`);
    photoGroup.append(`<input type="text" class="form-control" id="photo" placeholder="Photo url">`); // TODO: remove value="Photo"
    surveyDiv.append("<hr>");

    for (index = 0; index < questions.length; index++) {
        var question = questions[index];
        surveyDiv.append(addVoteQuestionToDiv(question, index + 1));
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#name").val().trim();
        if (name == "") {
            showError("Missing name");
            return;
        }

        var photo = $("#photo").val().trim();
        if (photo == "") {
            showError("Missing photo link");
            return;
        }

        var values = [];
        for (index = 1; index <= questions.length; index++) {
            var value = $(`input[name=question${index}]:checked`).val();
            if (value == undefined) {
                showError(`Missing response for question ${index}`);
                return
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

function showError(error) {
    $("#modal-error").text(error);
    $('#error-modal').modal('show');
}

function compare(friend, friends) {
    var bestScore = 9999;
    var myScore = friend.scores.reduce((a, b) => a + b, 0);
    var closestFriendMatch
    for (f of friends) {
        var friendScore = f.scores.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        var diff = Math.abs(myScore - friendScore);
        if (diff < bestScore) {
            closestFriendMatch = f;
            bestScore = diff;
        }
    }

    showBestMatchWithFriend(closestFriendMatch)
}

function showBestMatchWithFriend(friend) {
    $("#modal-name").text(friend.name);
    $("#modal-image").attr('src',friend.photo); 
    $('#match-modal').modal('show');
}

function addVoteQuestionToDiv(question, index) {
    var div = $("<div>");
    div.addClass("mb-3");
    div.append($("<h2>").text(index + ": " + question));
    var control = $("<div>");
    control.addClass("form-check");
    for (value of [1, 2, 3, 4, 5]) {
        control.append($(`<input type="radio" name="question${index}" value=${value} class="form-check-input" checked="checked">`)); // TODO: Removed checked="checked"
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