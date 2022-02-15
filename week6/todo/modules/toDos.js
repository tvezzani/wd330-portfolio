import { readFromLS, writeToLS } from "./ls.js";
import { qs, onTouch } from "./utilities.js";

//Variable for list of toDos
const toDoList = [];

//Class for toDo object
class toDo {
    constructor(id, content, completed){
        this.id = id;
        this.content = content;
        this.completed = completed;
        }
    }

//Save to JSON
function saveToDo(task, key) {
    //Generate unique id and write to LS
    let to_do = new toDo(Math.floor(Date.now()), task, false);
    toDoList.push(to_do);
    writeToLS(key, JSON.stringify(toDoList));
    //console.log('localStorage: ' + getToDos(key) + ' toDoList: ' + toDoList);
    }

//Get list of toDos
function getToDos(key) {
    // check the contents of todoList,
    //a local variable containing a list of ToDos.
    //If it is null then pull the list of todos from localstorage,
    //update the local variable, and return it
    return JSON.parse(readFromLS(key));
    }

//Render ToDo list
function renderToDoList(list, element) {
    element.innerHTML = "";
    list.forEach(_todo => {
        var li = document.createElement("li");
        const newContent = document.createTextNode(_todo.content);
        li.appendChild(newContent);
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        element.innerHTML += "<li id = " + _todo.id + ">" 
        + _todo.content + "<span class = 'close'>\u00D7</span></li>";
    });
 }

 function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

class toDos {
    constructor(element, key) {
        this.element = element;
        this.key = key;
        }

        //List the items
        listToDos() {
            renderToDoList(toDoList,this.element);
        }
        
        //Add an item to the list
        addToDo() {
            //Grab input from html where user enters task,
            //and send along with key to the saveTodo() functiuon
            let toDoName = document.getElementById("todo_name_field").value;
            document.getElementById("todo_name_field").value="";
            if (toDoName == ''){
                alert('Please enter a name.');
            }
            else{
                saveToDo(toDoName,this.key);
                //display current list of tasks
                this.listToDos();
            }
        }
        
        //Add an item to the list
        completeToDo() {

            //display current list of tasks
            this.listToDos();
        }
        
        //Add an item to the list
        removeToDo(id) {
            removeItemOnce(toDoList, id)
            console.log("remove to do was run");
            this.listToDos();
        }
        
        //Add an item to the list
        filterToDos() {

            //display current list of tasks
        }

        //Add an item to the list
        clearLocalStorage() {
            //Dangerous but for debugging
            localStorage.clear();
            console.log("local storage cleared");
        }
                
        /*
        showToDos(all, active, completed){
            const todosList = document.getElementById("todolist");
            todosList.innerHTML = "";
            this.renderTodolist(this.todos, todosList, all, active, completed);
            this.countLeftTasks();
        }
        
        renderTodolist(todoList, parent, all, active, completed){
            if(all == true){
            todoList.forEach(todo => {
                parent.appendChild(this.renderTodoItem(todo));
                this.countLeftTasks();
            });
            } else if(active == true){
                todoList.forEach(todo => {
                    if(todo.completed == false){
                    parent.appendChild(this.renderTodoItem(todo));
                    this.countLeftTasks();
                    }
                    });
            } else {
                todoList.forEach(todo => {
                if(todo.completed == true){
                    parent.appendChild(this.renderTodoItem(todo));
                    this.countLeftTasks();
                    }
                });
            }
        
        }*/
    }

export default toDos;