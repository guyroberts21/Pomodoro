const storage = window.localStorage;

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('.todo > button');
const input = document.getElementById('item');
const buttons = document.querySelectorAll('ul > li > button');

let todos = storage.getItem('items') ? JSON.parse(storage.getItem('items')) : [];
storage.setItem('items', JSON.stringify(todos));
const data = JSON.parse(storage.getItem('items'));

const list = todo => {
  const li = document.createElement('li');
  const deleteb = document.createElement('button');
  deleteb.textContent = "Delete Todo";
  deleteb.classList.add('delete');
  deleteb.setAttribute('onclick', 'deleteTodo(this.parentNode.firstChild)');
  li.textContent = todo;
  ul.appendChild(li).appendChild(deleteb);
  // let ind = todos.findIndex(ind => ind == deleteb.parentNode.firstChild.textContent)
  // console.log(ind);
};

form.addEventListener('submit', e => {
  e.preventDefault();

  todos.push(input.value);
  storage.setItem('items', JSON.stringify(todos));
  list(input.value);
  input.value = '';
});

data.forEach(todo => {
  list(todo);
})

button.addEventListener('click', () => {
  storage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});

function deleteTodo(item) {
  let index = todos.findIndex(index => index == item.textContent);
  todos.splice(index, 1);
  (todos.length > 0) ? storage.setItem('items', JSON.stringify(todos)) : storage.clear();
  ul.removeChild(item.parentNode);
}