buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickPattern = [];
gameStarted = false;
level = 0;

$('body').on("keydown", (event) => {
    if (!gameStarted) {
        nextSequence();
    }
})

$('body').on("touchstart", (event) => {
    if (!gameStarted) {
        nextSequence();
    }
})

$('.btn').click((event) => {
    playSound(event.target.id);
    animatePress(event.target.id);
    userClickPattern.push(event.target.id);
    checkAnswer(userClickPattern.length - 1);
})

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}

function playSound(name) {
    audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (currentLevel >= 0) {
        // If the user selected the correct color
        if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
            // If the user has finished the sequence
            if (userClickPattern.length === gamePattern.length) {
                // Give the user 1 second to screw up, then continue the game with the next color in the sequence
                setTimeout(() => nextSequence(), 1000);
            }
        } else {
            gameOver();
        }
    }
}

function nextSequence() {
    // Create a random number between 0 and 3 that will be used to randomly choose a color and play that color's sound
    randomNumber = Math.floor(Math.random() * (4) + 1) - 1;
    randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    gameStarted = true;
    $('h1').text("level " + ++level);
    userClickPattern = [];
}

function resetGame() {
    $('h1').text("Game Over, Press Any Key to Start");
    gamePattern = [];
    userClickPattern = [];
    gameStarted = false;
    level = 0;
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    playSound("wrong");
    resetGame();
}
