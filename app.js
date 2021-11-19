// Define UI Vars
const form = document.querySelector('#task-form');
const tasksList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listiners

loadEventListeners();

function loadEventListeners() {

    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    tasksList.addEventListener('click', removeTask);

    // Clear tasks
    clearBtn.addEventListener('click', clearTask);

    // Filter Tasks
    filter.addEventListener('keyup', filterTask);

}


// Get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task) {
     // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Creat new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    tasksList.appendChild(li);
    });
  
}



function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Creat new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    tasksList.appendChild(li);
    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);


    

    // Clear input
    taskInput.value = '';

    e.preventDefault();
    
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Removing a task  
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();


        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
       

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}





// Clearing a task
function clearTask(e) {
    tasksList.innerHTML = '';


    // clear from local storage
    removeTaskFromLocalStorage();
}

// Clear tasks from Local Storage
function removeTaskFromLocalStorage() {
    localStorage.clear();
}


function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display ='block';

        } else {
            task.style.display = 'none';
        }

    });
    

}