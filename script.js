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
        }, 1000);
        startStopBtn.textContent = 'Stop';
    } else {
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';
    }
    running = !running;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    updateStopwatch();
}

function addPoints() {
    const additionalPoints = parseInt(pointsInput.value, 10);
    if (!isNaN(additionalPoints) && additionalPoints > 0) {
        points += additionalPoints;
        pointsDisplay.textContent = `Points: ${points}`;
        elapsedTime += additionalPoints;
        updateStopwatch();
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
addPointsBtn.addEventListener('click', addPoints);

updateStopwatch();
