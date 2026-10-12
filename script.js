let tasks = JSON.parse(localStorage.getItem("collegeTasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("collegeTasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  list.innerHTML = "";

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}
             onchange="toggleTask(${task.id})">
      <span>${escapeHtml(task.text)}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    list.appendChild(li);
  });

  emptyMessage.style.display = filteredTasks.length === 0 ? "block" : "none";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.getElementById("taskInput").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
