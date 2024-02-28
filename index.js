let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
}

$(".btn").on("click", function(e) {
    if(level !== 0){
        let userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1, userChosenColour);
    }
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(
        function() {
            $("#" + currentColour).delay(100).removeClass("pressed");
        }, 100);
}

$(document).on("keypress", function(e) {
    if(level === 0) {
        nextSequence();
    }
});

function checkAnswer(currentLevel, userChosenColour) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        playSound(userChosenColour);
        if (gamePattern.length === userClickedPattern.length) {
            userClickedPattern = [];
            setTimeout(nextSequence(), 1000);
        }
    }
    else {
        startOver();
    }
}

function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(
        function() {
            $("body").removeClass("game-over");
        }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}