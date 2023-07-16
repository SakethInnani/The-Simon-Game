// script for vaidation, animations and sound effects

// array of colours  
var buttonColours = ["red", "blue", "green", "yellow"];

// game generated pattern
var gamePattern = [];
// user generated pattern
var userClickedPattern = [];

var started = false;

// initialize level
var level = 0;

// start game on pressing any key
$(document).keypress(function() {

  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }

});

// function to generate a new random colour for each new level
function nextSequence() {

  userClickedPattern = [];
  level++;
  
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// store user clicked colour and validate for its correctness
$(".myB").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

// check if user chosen color is correct
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 625);

      }

    } else {

      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
      
    }

}

// animate the button pressed
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

// play corresponding sound for each button clicked
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// game over, start again
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

  $('.myB').blur();

}
