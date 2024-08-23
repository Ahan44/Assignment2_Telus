// Select DOM elements
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('tasks');
const searchBar = document.getElementById('search-bar');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description}</small><br>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Unmark' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to add task
function addTask(e) {
    e.preventDefault();
    const newTask = {
        title: taskTitle.value,
        description: taskDesc.value,
        dueDate: taskDate.value,
        completed: false
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
}

// Function to edit task
function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDesc.value = task.description;
    taskDate.value = task.dueDate;
    deleteTask(index);
}

// Function to delete task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Function to toggle complete status
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Filter tasks
function filterTasks(e) {
    const filter = e.target.id;
    let filteredTasks;
    if (filter === 'filter-all') {
        filteredTasks = tasks;
    } else if (filter === 'filter-completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'filter-incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    renderTasks(filteredTasks);
}

// Search tasks
function searchTasks() {
    const searchText = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText)
    );
    renderTasks(filteredTasks);
}

// Event Listeners
taskForm.addEventListener('submit', addTask);
document.getElementById('filter-all').addEventListener('click', filterTasks);
document.getElementById('filter-completed').addEventListener('click', filterTasks);
document.getElementById('filter-incomplete').addEventListener('click', filterTasks);
searchBar.addEventListener('input', searchTasks);

// Initial render
renderTasks();
