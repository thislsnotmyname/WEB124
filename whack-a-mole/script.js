// Jeremy Meyers, 11/20/2024
// WB's variables
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let score = 0;
let lastHole;
let timeUp = false;

// My variables
const timerEl = document.querySelector('#timer');
const highScoreEl = document.querySelector('#high-score');
let highScore = localStorage.getItem('highScore') || 0;
let timer = 0;

// WB's functions
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole == lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    
    // Mine
    determinePoints(hole);
    
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        
        // Mine
        if (hole.children[0].classList.contains('shiny')) setTimeout(() => hole.children[0].classList.remove('shiny'), 400);
        if (hole.children[0].classList.contains('human')) setTimeout(() => hole.children[0].classList.remove('human'), 400);

        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreBoard.textContent = score;

    timeUp = false;
    // Mine
    timer = 10;
    timerEl.textContent = timer;
    
    peep();

    // Mine
    const initTimer = setInterval(() => {
        timer--;
        timerEl.textContent = timer;
    }, 1000);
    
    setTimeout(() => {
        timeUp = true;

        // Mine
        clearInterval(initTimer);
        setTimeout(() => timerEl.textContent = '10', 2000);
        if (score > highScore) newHighScore();
    }, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return;

    // Mine
    score += Number(e.target.getAttribute('data-points'));
    
    scoreBoard.textContent = score;
    this.classList.remove('up');
}

// My functions
function determinePoints(hole) {
    const rand = Math.floor(Math.random() * 100);
    const mole = hole.querySelector('.mole');
    if (rand >= 90) {
        mole.classList.add('shiny');
        mole.setAttribute('data-points', 10);
    } else if (rand >= 65) {
        mole.classList.add('human');
        mole.setAttribute('data-points', -5);
    } else {
        mole.setAttribute('data-points', 1);
    }
}

function newHighScore() {
    const highScoreBanner = document.querySelector('#high-score-banner');
    highScoreBanner.style.display = 'block';
    highScoreBanner.style.opacity = '1';

    highScoreEl.textContent = highScore;
    localStorage.setItem('highScore', score);
    
    setTimeout(() => {
        highScoreBanner.style.opacity = '0';
        setTimeout(() => highScoreBanner.style.display = 'none', 300);
    }, 3000);
}

// WB's event listener
moles.forEach(mole => mole.addEventListener('click', bonk));

// My initialization
highScoreEl.textContent = highScore;