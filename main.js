const container = document.getElementById('pomodoro');
const displayTimer = document.getElementById('timer');
const stopBtn = document.querySelector('.stop-timer')
const startBtn = document.querySelector('.start-timer')
const timerButtons = document.querySelectorAll('.timer-buttons > button');

// Get user break/work times
const workTime = document.getElementById('wtime');
const breakTime = document.getElementById('btime');

// Track number of pomodoros
const pomodoroNum = document.getElementById('pomodoro-count');
let pomodoroCounter = 1;

// Default variables
let workSeconds = 25 * 60;
let breakSeconds = 5 * 60; 
let interval;
let breakStartingNext = true; // Boolean used to alternate between break and work times

function timer(s) {
  interval = setInterval(() => {
    updateDisplay(s);
    s--;
    
    if (breakStartingNext) workSeconds--;
    else breakSeconds--;
    
    if (s < 0) {
      workSeconds = parseInt(workTime.value) ? parseInt(workTime.value) : 25 * 60;
      breakSeconds = parseInt(breakTime.value) ? parseInt(breakTime.value) : 5 * 60; 

      s = breakStartingNext ? breakSeconds : workSeconds
      
      if (breakStartingNext) {
        container.style.backgroundColor = '#2ac200';
      }
      else {
        container.style.backgroundColor = '#C55E5E';
      }

      breakStartingNext = !breakStartingNext;

      if (breakStartingNext) {
        pomodoroCounter++;
        pomodoroNum.textContent = pomodoroCounter.toString();
      }
    }
  }, 1000);
}

function updateDisplay(sec) {
  const minutes = Math.floor(sec / 60);
  let secondsLeft = sec % 60;

  displayTimer.textContent = `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
}

function stopTimer(e) {
  startBtn.disabled = false;
  startBtn.classList.remove('disabled-btn');
  clearInterval(interval);
}

function startTimer(e) {  
  timer(breakStartingNext ? workSeconds : breakSeconds);
  stopBtn.disabled = false; 
  stopBtn.classList.remove('disabled-btn');
}

// Only allow number input on modal
const setTimes = document.getElementsByClassName('time-input');

for (let input of setTimes) {
  input.addEventListener('input', onlyNumbers);
}

function onlyNumbers(e) {
  let reg = /^\d+$/;
  if (reg.test(e.target.value)) {
    e.target.value = e.target.value;
  } else {
    let txt = e.target.value.slice(0, -1);
    e.target.value = txt;
  }
}

// Start and Stop Buttons
timerButtons.forEach(btn => btn.addEventListener('click', e => {
  e.target.disabled = true;
  e.target.classList.add('disabled-btn');
}))

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Modal (settings button)
const modal = document.getElementById('modal');
const modalBtn = document.getElementById('modalBtn');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
modalCloseBtn.addEventListener('click', closeModal);
// Listen for outside click (in window)
window.addEventListener('click', clickOutside);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function submit() {
  stopTimer();
  workSeconds = parseInt(workTime.value) * 60;
  breakSeconds = parseInt(breakTime.value) * 60;
  modal.style.display = 'none';
  updateDisplay(workSeconds);
  container.style.backgroundColor = '#C55E5E';
}

// Side Nav
const hamburger = document.getElementById("hamburger-menu");
const sidenav = document.querySelector('.sidenav');
const dateText = document.getElementById('date');

hamburger.addEventListener('click', () => {
  sidenav.style.width = "250px";
});

const closeBtn = document.querySelector('.closebtn');
closeBtn.addEventListener('click', () => {
  sidenav.style.width = "0";
})

// get date on sidenav
let currentDate = new Date();
let day = String(currentDate.getDate()).padStart(2, '0');
let month = String(currentDate.getMonth() + 1).padStart(2, '0');
let year = currentDate.getFullYear();
dateText.textContent = `${day}/${month}/${year}`;











/* Extra

function toggle(button, state) {
  button.disabled = state;
  button.classList.toggle('disabled-btn');
}

function stopTimer(event) {
  // startBtn.disabled = false;
  // startBtn.classList.remove('disabled-btn');
  toggle(startBtn)
  clearInterval(interval);
  // e.target.disabled = true;
  // e.target.classList.add('disabled-btn');
}

timerButtons.forEach(button => button.addEventListener('click', event => {
  (event.target.textContent == "START") ? timer(seconds) : stopTimer(event);
}));

*/