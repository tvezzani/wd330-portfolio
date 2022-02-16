import { readFromLS, writeToLS } from "./ls.js";
import { qs, onTouch } from "./utilities.js";

//Variable for list of toDos
let toDoList = [];

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
    return to_do;    
}

//Get list of toDos
function getToDos(key) {
    // check the contents of todoList,
    //a local variable containing a list of ToDos.
    //If it is null then pull the list of todos from localstorage,
    //update the local variable, and return it
    return JSON.parse(readFromLS(key));
    }

//-----------------------------Refactor to removeToDo?
function addButtonEventListener(button){
    //console.log(button);
    button.addEventListener("click", () => {
        //_toDos.addToDo();
        //console.log({button, text: button.closest('li').id});
            toDoList = toDoList.filter(entry => {
                const keep = entry.id != button.closest('li').id;
                // if (keep) renderToDoList(toDoList, button.closest('ul'))
                return keep;
            });
            window.toDoList = toDoList;
            //Just to pass reference to listToDos
            renderToDoListItems();
        });
    }

function renderToDoListItems() {
    var _toDos =
    new toDos(document.getElementById("taskList"),111);
    _toDos.listToDos();
}

function addCompleteEventListener(listItem){
    listItem.addEventListener("click", () => {
        //console.log(listItem.id);
        toDoList.filter(entry => {
            const keep = entry.id == listItem.closest('li').id;
            if (keep) {
                entry.completed = true;
                console.log("Marked " + entry.content + " as complete.");
            }
            return keep;
        });
        renderToDoListItems();
    });
}

function addListItemEventListeners(){
    const listItems = Array.from(/*use qs here*/document.querySelectorAll('#taskList li'));
    listItems.forEach(listItem => {
        const button = listItem.querySelector('span.close');
        addButtonEventListener(button);
        addCompleteEventListener(listItem);
    });
}
//----------------------------------------

//Render ToDo list
function renderToDoList(list, element) {
    element.innerHTML = "";
    list.forEach(_todo => {
        var li = document.createElement("li");
        let isChecked = "";
        if (_todo.completed) isChecked = " class = 'checked' ";
        const newContent = document.createTextNode(_todo.content);
        li.appendChild(newContent);
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        element.innerHTML += "<li id = " + _todo.id + isChecked + ">" 
        + _todo.content + "<span class = 'close'>\u00D7</span></li>";
    });
    addListItemEventListeners();
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
            let newToDo;
            document.getElementById("todo_name_field").value="";
            if (toDoName == ''){
                alert('Please enter a name.');
            }
            else{
                newToDo = saveToDo(toDoName,this.key);
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