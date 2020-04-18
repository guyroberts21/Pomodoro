const displayTimer = document.getElementById('timer');
const stopBtn = document.querySelector('.stop-timer')
const startBtn = document.querySelector('.start-timer')

const timerButtons = document.querySelectorAll('.timer-buttons > button');

let seconds = 25 * 60;
let interval;

function timer(s) {
  // stopBtn.disabled = false;  // added
  // stopBtn.classList.remove('disabled-btn'); // added
  interval = setInterval(() => {

    const minutes = Math.floor(s / 60);
    let secondsLeft = s % 60;
    
    displayTimer.textContent = `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
    s--;
    seconds--; // added
    
    if (s < 0) {
      clearInterval(interval);
    }
  }, 1000);
}

function stopTimer(e) {
  startBtn.disabled = false;
  startBtn.classList.remove('disabled-btn');
  clearInterval(interval);
}

function startTimer(e) {
  timer(seconds);
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