// script.js

let tasks = [];
let showOnlyDone = false;

const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const counter = document.querySelector('#counter');
const filterBtn = document.querySelector('#filter-done');
const themeToggle = document.querySelector('#theme-toggle');

function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = storedTasks;
  renderTasks();
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (task.done) li.classList.add('done');

  const span = document.createElement('span');
  span.textContent = task.title;

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.className = 'done-btn';
  doneBtn.onclick = () => toggleDone(task.id);

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => deleteTask(task.id);

  li.append(span, doneBtn, delBtn);
  return li;
}

function renderTasks() {
  taskList.innerHTML = '';
  const filtered = showOnlyDone ? tasks.filter(t => t.done) : tasks;
  filtered.forEach(task => taskList.appendChild(createTaskElement(task)));
  updateCounters();
  saveTasksToStorage();
}

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  counter.textContent = `Total: ${total} | Done: ${completed}`;
}

function addTask(e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title || tasks.some(t => t.title === title)) return;
  const newTask = {
    id: Date.now(),
    title,
    done: false
  };
  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function applyThemeFromStorage() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
}

taskForm.addEventListener('submit', addTask);
filterBtn.addEventListener('click', () => {
  showOnlyDone = !showOnlyDone;
  filterBtn.textContent = showOnlyDone ? 'Show All Tasks' : 'Show Done Tasks';
  renderTasks();
});
themeToggle.addEventListener('click', toggleTheme);

loadTasksFromStorage();
applyThemeFromStorage();
