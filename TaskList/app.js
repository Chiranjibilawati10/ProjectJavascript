//define ui variable
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');  


//calling all event listeners
loadEventListeners();

//loading all eventlistener

function loadEventListeners() {
    //DOM  load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //add task event or form
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //to clear event at once
    clearBtn.addEventListener('click', clearTask);
    //filter task event
    filter.addEventListener('keyup', filterTasks);
}
//get task from local storage   
function getTasks(){
    let tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        //creating element
    const li = document.createElement('li');
    //adding class
    li.className = 'collection-item';
    //create textnode and append to li
    li.appendChild(document.createTextNode(task));
    //create new link
    const link = document.createElement('a');
    //adding class
    link.className = 'delete-item secondary-content';
    //add html icon
    link.innerHTML = '<i class="fa fa-remove"></i> ';

    //append link ti li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    });
}

function addTask(e) 
{
   
    if(taskInput.value === '') {
        
        alert('Add a task');
    }
    //creating element
    const li = document.createElement('li');
    //adding class
    li.className = 'collection-item';
    //create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link
    const link = document.createElement('a');
    //adding class
    link.className = 'delete-item secondary-content';
    //add html icon
    link.innerHTML = '<i class="fa fa-remove"></i> ';

    //append link ti li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //storing task to local storage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';
    

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to remove task

function removeTask(e) 
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Do you want to delete?'))
        {
            e.target.parentElement.parentElement.remove();
        }
        
    }
}

//function to clear at once
function clearTask(e)
{
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
//function to filter the event

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })

}