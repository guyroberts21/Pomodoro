const displayTimer = document.querySelector('#timer');
const timerButtons = document.querySelectorAll('.timer-buttons > button');
let minutes = 25;
let interval;

const timer = s => {  
  interval = setInterval(() => {
    const minutes = Math.floor(s / 60);
    let seconds = s % 60;
    
    displayTimer.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    s--;
    if (s < 0) clearInterval(interval);
  }, 1000);
};

timerButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    let target = e.target;
    if(target.textContent == "START") {
      target.disabled = true;
      timer(minutes * 60);
    }
  });
});