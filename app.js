const outline = document.querySelector(".moving circle");
const circle = document.querySelector(".outline circle");
const timeDisplay = document.querySelector("#time-display");
const stopBtn = document.querySelector(".stop");
const startBtn = document.querySelector(".start");
const slider = document.querySelector(".slider");
const sliderOutput = document.querySelector(".time-range");

startBtn.addEventListener("click", (e) => {
  startTimer(slider.value);
  startBtn.style.color = "white";
  startBtn.style.pointerEvents = "none";
});

stopBtn.addEventListener("click", () => {
  timeUp("START");
});

slider.addEventListener("input", (e) => {
  outputTime = formatTime(e.target.value);
  timeDisplay.innerHTML = outputTime;
  timeUp(outputTime);
});

function startTimer(time) {
  let timePassed = 0;

  myTimer = setInterval(() => {
    circle.setAttribute("stroke", "white");
    timePassed = timePassed += 1;
    timeLeft = time - timePassed;
    timeDisplay.innerHTML = formatTime(timeLeft);
    outlineLength = calculateLengthOfCircle();
    let progress = outlineLength - (timePassed / time) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (timeLeft === 0) {
      var audio = new Audio("sounds/end-bell.mp3");
      audio.play();
      timePassed = 0;
      timeUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function timeUp(t = "DONE") {
  clearInterval(myTimer);
  startBtn.style.color = "rgb(64, 231, 64)";
  startBtn.style.pointerEvents = "initial";
  timeDisplay.innerHTML = t;
  circle.setAttribute("stroke", "#e43f5a");
}

function calculateLengthOfCircle() {
  let outlineLength = outline.getTotalLength();

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  return outlineLength;
}
