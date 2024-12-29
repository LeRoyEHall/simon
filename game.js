buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickPattern = [];
gameStarted = false;
userTurn = false;
level = 0;

$('body').on("keydown", (event) => {
    startGame();
});

$('body').on("touchend", (event) => {
    startGame();
});

$('.btn').click((event) => {
    if (userTurn && gameStarted) {
        playSound(event.target.id);
        animatePress(event.target.id);
        userClickPattern.push(event.target.id);
        checkAnswer(userClickPattern.length - 1);
    }
});

function startGame() {
    if (!gameStarted) {
        setTimeout(() => nextSequence(), 700);
    }
}

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
                userTurn = false;
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
    gamePattern.push(randomChosenColor);
    gameStarted = true;
    $('h1').text("level " + ++level);
    userClickPattern = [];
    playGamePattern();
}

function resetGame() {
    gamePattern = [];
    userClickPattern = [];
    gameStarted = false;
    level = 0;
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    playSound("wrong");
    $('h1').text("Game Over. You made it to level " + level +  ". Press Any Key or Tap to Start");
    resetGame();
}

async function playGamePattern() {
    for (const color of gamePattern) {
        playSound(color);
        $("#" + color).fadeOut(100).fadeIn(100);
        await new Promise(resolve => setTimeout(resolve, 700));
    };
    userTurn = true;
}
