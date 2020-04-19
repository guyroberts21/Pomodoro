const displayTimer = document.getElementById('timer');
const stopBtn = document.querySelector('.stop-timer')
const startBtn = document.querySelector('.start-timer')

const timerButtons = document.querySelectorAll('.timer-buttons > button');

// Get user break/work times
const workTime = document.getElementById('wtime');
const breakTime = document.getElementById('btime');

let workSeconds = 25 * 60;
let breakSeconds = 5 * 60; 
let interval;
let breakStartingNext = true; // Boolean used to alternate between break and work times

// Only allow number input on modal 
function onlyNumbers(inputVal) {
  let reg = /^\d+$/;
  if (reg.test(inputVal)) {
    document.querySelector('.time-input').value = inputVal;
  } else {
    let txt = inputVal.slice(0, -1);
    document.querySelector('.time-input').value = txt;
  }
}

function timer(s) {
  interval = setInterval(() => {

    const minutes = Math.floor(s / 60);
    let secondsLeft = s % 60;
    
    displayTimer.textContent = `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
    s--;
    
    if (breakStartingNext) workSeconds--;
    else breakSeconds--;
    
    if (s < 0) {
      breakStartingNext = !breakStartingNext;
      s = breakStartingNext ? breakSeconds : workSeconds
    }
  }, 1000);
}

function stopTimer(e) {
  startBtn.disabled = false;
  startBtn.classList.remove('disabled-btn');
  clearInterval(interval);
}

function startTimer(e) {
  workSeconds = workTime.value ? parseInt(workTime.value) * 60 : 25 * 60;
  breakSeconds = breakTime.value ? parseInt(breakTime.value) * 60 : 5 * 60;

  timer(breakStartingNext ? workSeconds : breakSeconds);
  stopBtn.disabled = false; 
  stopBtn.classList.remove('disabled-btn');
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