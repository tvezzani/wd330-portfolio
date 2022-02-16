import { readFromLS, writeToLS } from "./ls.js";
import { qs, onTouch } from "./utilities.js";

//Variable for list of toDos
let toDoList = [];
let filterString = "all";

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

//Update todo list in local storage
function updateToDoList(list, key) {
    writeToLS(key, JSON.stringify(list));
}

//Get list of toDos
function getToDos(key) {
    if (toDoList.length === 0) {
        let temp;
        temp = readFromLS(key);
        if (temp !== null) {
            console.log(temp.length);
            return temp;
        }
        else{
            return toDoList;
        }
    }
}

//-----------------------------Refactor to removeToDo?
function addButtonEventListener(button){
    button.addEventListener("click", () => {
            toDoList = toDoList.filter(entry => {
                const keep = entry.id != button.closest('li').id;
                return keep;
            });
            renderToDoListItems();
        });
    }

function renderToDoListItems() {
    var _toDos =
    new toDos(document.getElementById("taskList"),111);
    _toDos.listToDos();
}

function completeToDoList() {
    var _toDos =
    new toDos(document.getElementById("taskList"),111);
    _toDos.completeToDo();
}

function addCompleteEventListener(listItem){
    listItem.addEventListener("click", () => {
        toDoList.filter(entry => {
            const keep = entry.id == listItem.closest('li').id;
            if (keep) {
                entry.completed = true;
                console.log("Marked " + entry.content + " as complete.");
            }
            return keep;
        });
        completeToDoList();
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

    //Update bottom bar text
    let tasksLeft = document.getElementById("tasks_left");
    tasksLeft.innerText = getListByCompleted(false).length + " tasks left.";

    //
    let filterAll = document.getElementById("filter_all");
    let filterActive = document.getElementById("filter_active");
    let filterComplete = document.getElementById("filter_complete");

    filterAll.className = "btn";
    filterActive.className = "btn";
    filterComplete.className = "btn";

    if (filterString === "all"){
        filterAll.className = "btn active";
    }
    else if (filterString === "active"){
        filterActive.className = "btn active";
    }
    else if (filterString === "complete"){
        filterComplete.className = "btn active";
    }
    else{
        console.error('invalid filterString');
    }

    //Add listeners to dynamic list items and spans
    addListItemEventListeners(); 
 }

function getListByCompleted(isComplete) {
        //Filter list
        let list = toDoList.filter(entry => {
            const keep = entry.completed == isComplete;
            return keep;
            }); 
    return list;
}

function initToDos(key) {
    if (toDoList.length === 0)
    {
        let temp;
        temp = readFromLS(key);
        if (temp !== null) toDoList = temp;
    }
}

class toDos {
    constructor(element, key) {
        this.element = element;
        this.key = key;
        }

        //List the items
        listToDos() {
            initToDos(this.key);
            //toDoList = getToDos(this.key);

            let list = toDoList;
            if (filterString === "all")
            {
                //Do nothing
            }
            else  if (filterString === "active")
            {
                //Filter list
                list = getListByCompleted(false);
            }
            else if (filterString === "complete")
            {
                //Filter list
                list = getListByCompleted(true);
            }
            else
            {
                console.error(
                    "listToDos requires one of the following strings: 'all', 'active', or 'complete'."
                    );
            }
            renderToDoList(list,this.element);
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
            //Save completed todo
            updateToDoList(toDoList,this.key);
            this.listToDos();
        }
        
        //Remove item from todo list
        removeToDo(id) {
            removeItemOnce(toDoList, id)
            console.log("remove to do was run");
            this.listToDos();
        }
        
        //Filter items by type
        filterToDos(filterName) {
            filterString = filterName;
            this.listToDos();
        }

        //Clear the storage
        clearLocalStorage() {
            //Dangerous but for debugging
            localStorage.clear();
            console.log("local storage cleared");
        }
    }

export default toDos;