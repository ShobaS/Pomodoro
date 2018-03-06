"use strict";
var breakLength = 5;
var sessionLength = 25;
var isPaused = true;
var x = false;

// break duration
function addTime(e) {
  breakDuration.innerHTML = ++breakLength;
}

function minusTime() {
  if(breakLength > 1){
    breakDuration.innerHTML = --breakLength;
  }
}

//session duration
function addSessionTime(e) {
  if(sessionLength < 60) {
    sessionLength++;
    sessionDuration.innerHTML = sessionLength;
    sessionTiming.innerHTML = sessionLength;
  }
}

function minusSessionTime(e) {
  if(sessionLength > 1) {
    sessionLength--;
    sessionDuration.innerHTML = sessionLength;
    sessionTiming.innerHTML = sessionLength;
  }
}

//timer
function updateTimer(length) {
  var min = length;
  var sec = 60;
  min--;
  x = setInterval(function () {
    if (isPaused) {
      sec--;
      if (sec <= 0) {
        sec = 60;
        min--;
      }
      if (sec < 10) {
        sec = toAddZero(sec);
      }
      if (min < 10) {
        min = toAddZero(min);
      }
      if (min < 0) {
        sec = toAddZero(0);
        min = toAddZero(0);
        clearInterval(x);
        x = false;
        if (length == sessionLength) {
          updateTimer(breakLength);
        }
        else {
          updateTimer(sessionLength);
        }
      }
      if (length == sessionLength) {
        document.getElementById("taskName").innerHTML = "Session";
      }
      else if (length == breakLength) {
        document.getElementById("taskName").innerHTML = "Break";
      }
      document.getElementById("sessionTiming").innerHTML = min + " : " + sec;
    }
  }, 1000);
}
//to add zero in front of number
function toAddZero(n) {
  return ('0' + n).slice(-2);
}

//to pause the timer 
function pauseTimer() {
  if(x) {
    isPaused = !isPaused;
    if(isPaused) {
      document.getElementById("pauseBtn").innerHTML = "Pause";
    }
    else {
      document.getElementById("pauseBtn").innerHTML = "Resume";
    }
  }
}

//to reset the timer
function reset() {
  breakLength = 5;
  sessionLength = 25;
  breakDuration.innerHTML = breakLength;
  sessionDuration.innerHTML = sessionLength;
  sessionTiming.innerHTML = sessionLength;
  if(isPaused == false) {
    document.getElementById("pauseBtn").innerHTML = "Pause";
    isPaused = true;
  }
  clearInterval(x);
  x = false;
}

const breakPlus = document.getElementById("breakPlus");
const breakMinus = document.getElementById("breakMinus");
const breakDuration = document.getElementById("breakLen");
breakPlus.addEventListener("click", addTime);
breakMinus.addEventListener("click", minusTime);
const sessionDuration = document.getElementById("sessionLen");
const sessionTiming = document.getElementById("sessionTiming");
const sessionPlus = document.getElementById("sessionPlus");
const sessionMinus = document.getElementById("sessionMinus");
sessionPlus.addEventListener("click", addSessionTime);
sessionMinus.addEventListener("click", minusSessionTime);
const timer = document.getElementById("startBtn");
timer.addEventListener("click", () => updateTimer(sessionLength));
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);