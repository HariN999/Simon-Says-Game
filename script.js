let gameSeq = [];
let userSeq = [];

let btns = ['yellow', 'purple', 'green', 'red'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        userSeq = [];
        h2.innerText = "Game Started!";
        setTimeout(levelUp, 500);
    }
});

// Computer flashes a button
function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 250);
}

// User clicks a button
function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(() => btn.classList.remove('userflash'), 250);
}

function levelUp() {
    userSeq = []; // reset user sequence for this level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // use all 4 colors
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let randBtn = document.querySelector(`#${randColor}`);
    setTimeout(() => gameFlash(randBtn), 500);
    console.log("Game Sequence:", gameSeq);
}

function checkAnswer(index) {
    if (userSeq[index] !== gameSeq[index]) {
        h2.innerText = "Game Over, Press Any Key to Restart";
        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 200);
        resetGame();
        return;
    }

    // If the user finished the sequence correctly
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    userFlash(btn);
    checkAnswer(userSeq.length - 1);
}

// Event listeners for buttons
let allbtns = document.querySelectorAll(".btn");
allbtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
