var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(50)
    .fadeIn(50);

  playSound("sounds/" + randomChosenColor + ".mp3");
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound("sounds/" + userChosenColor + ".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColor) {
  var activeKey = $("#" + currentColor);
  activeKey.addClass("pressed");

  setTimeout(function () {
    activeKey.removeClass("pressed");
  }, 100);
}

var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  }
});
