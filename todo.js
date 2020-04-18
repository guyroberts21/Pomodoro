const storage = window.localStorage;

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('.todo > button');
const input = document.getElementById('item');

let todos = [];

storage.setItem('items', JSON.stringify(todos));
const data = JSON.parse(storage.getItem('items'));

const list = todo => {
  const li = document.createElement('li');
  li.textContent = todo;
  ul.appendChild(li);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  list(input.value);
  input.value = '';
});