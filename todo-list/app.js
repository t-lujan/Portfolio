//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
//prevent form from submitting
  event.preventDefault();

// to-do DIV
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

// create LI
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-item');
todoDiv.appendChild(newTodo);
//ADD todos to localStorage
saveLocalTodos(todoInput.value);

// check mark/ completed todoButton
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class= "fas fa-check"></i>';
completedButton.classList.add('complete-btn')
todoDiv.appendChild(completedButton);

// check trash Button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
trashButton.classList.add('trash-btn')
todoDiv.appendChild(trashButton);

//apphend to List
todoList.appendChild(todoDiv);
//clear to do input value
todoInput.value = "";
}


//delete to do
function deleteCheck(e) {
  const item = e.target;
  if(item.classList[0] === 'trash-btn'){
  const todo = item.parentElement;

  todo.classList.add("fall");
  removeLocalTodos(todo);
  todo.addEventListener('transitionend', function(){
    todo.remove();
  })
  }


//green check mark logic
if(item.classList[0] === "complete-btn"){
  const todo = item.parentElement;
  todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    })

}

function saveLocalTodos(todo) {
  //check-- hey do i already have things in there?
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
  console.log("hello");
  let todos;
//check-- hey do i already have things in there?
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    // to-do DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // check mark/ completed todoButton
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    // check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //apphend to List
    todoList.appendChild(todoDiv);

  });
}

function removeLocalTodos(todo) {
let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
