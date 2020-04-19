const storage = window.localStorage;

const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('.todo > button');
const input = document.getElementById('item');

const taskLength = document.querySelector('.todo > h2');

let todos = storage.getItem('items') ? JSON.parse(storage.getItem('items')) : [];
storage.setItem('items', JSON.stringify(todos));
const data = JSON.parse(storage.getItem('items'));

const list = todo => {
  const li = document.createElement('li');
  const deleteb = document.createElement('button');
  const checkb = document.createElement('input')
    
  li.textContent = todo;

  deleteb.textContent = "🗑️";
  deleteb.classList.add('delete');
  deleteb.setAttribute('onclick', 'deleteTodo(this.parentNode.firstChild)');

  checkb.setAttribute('type', 'checkbox');

  ul.appendChild(li).appendChild(checkb)
  ul.appendChild(li).appendChild(deleteb);
  // let ind = todos.findIndex(ind => ind == deleteb.parentNode.firstChild.textContent)
  // console.log(ind);
  taskLength.textContent = `Todos (${todos.length})`
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
  todos = [];
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  taskLength.textContent = `Todos (${todos.length})`
});

function deleteTodo(item) {
  let index = todos.findIndex(index => index == item.textContent);
  todos.splice(index, 1);
  (todos.length) ? storage.setItem('items', JSON.stringify(todos)) : storage.clear();
  ul.removeChild(item.parentNode);
  taskLength.textContent = `Todos (${todos.length})`
}