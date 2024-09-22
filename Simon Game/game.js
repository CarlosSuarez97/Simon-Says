var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function(){
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    }, 300);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("Success!");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 700)
        }
    } else {
        console.log("Wrong answer, man.")
        $("body").addClass("game-over");
        $("#level-title").text("Game over, man. Game over.");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}