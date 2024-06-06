let stopwatchInterval;
let elapsedTime = 0;
let points = 0;
let running = false;

const stopwatchDisplay = document.getElementById('stopwatch');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const pointsInput = document.getElementById('pointsInput');
const addPointsBtn = document.getElementById('addPointsBtn');
const pointsDisplay = document.getElementById('pointsDisplay');

// ローカルストレージから保存された状態を読み込む
function loadState() {
    const savedElapsedTime = localStorage.getItem('elapsedTime');
    const savedPoints = localStorage.getItem('points');
    const savedRunning = localStorage.getItem('running');

    if (savedElapsedTime !== null) {
        elapsedTime = parseInt(savedElapsedTime, 10);
    }
    if (savedPoints !== null) {
        points = parseInt(savedPoints, 10);
    }
    if (savedRunning !== null) {
        running = savedRunning === 'true';
    }

    updateStopwatch();
    pointsDisplay.textContent = `Points: ${points}`;

    if (running) {
        startStopwatch();
    }
}

// 現在の状態をローカルストレージに保存する
function saveState() {
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('points', points);
    localStorage.setItem('running', running);
}

function updateStopwatch() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    stopwatchDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!running) {
        stopwatchInterval = setInterval(() => {
            elapsedTime++;
            updateStopwatch();
            saveState();
        }, 1000);
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';
    }
    running = !running;
    saveState();
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    running = false;
    updateStopwatch();
    startStopBtn.textContent = 'Start';
    saveState();
}

function addPoints() {
    const pointsToAdd = parseInt(pointsInput.value, 10);
    if (!isNaN(pointsToAdd) && pointsToAdd > 0) {
        elapsedTime += pointsToAdd;
        points += pointsToAdd;
        updateStopwatch();
        pointsDisplay.textContent = `Points: ${points}`;
        saveState();
    }
    pointsInput.value = '';
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
addPointsBtn.addEventListener('click', addPoints);

// ページ読み込み時に状態を復元
window.onload = loadState;
