import toDos from "./modules/toDos.js";

/*// Create close button
var taskList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < taskList.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  taskList[i].appendChild(span);
}

// Hide an item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add checked symbol
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create new item
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Please write something.");
  } else {
    document.getElementById("myUL").appendChild(li);
  }

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}*/

//Create instance of ToDos object
var _toDos =
  new toDos(document.getElementById("taskList"),111);
  _toDos.listToDos();
//console.log("Created toDoList");

//Add event listener for buttons all, active and complete-------------------------------------

//Add listenter to add task button
document.getElementById("add_todo").addEventListener("click", () => {
  const newToDo = _toDos.addToDo();
  // addListItemEventListeners(newToDo);
  // setTimeout( () => {
  // addListItemEventListeners(newToDo);
  // }, 500);
});

//Add listenter to add task button
// Array.from(document.querySelectorAll("span.close")).forEach(button => {
//   button.addEventListener("click", () => {
//     //_toDos.addToDo();
//     console.log("deleting todo");
//   });
// });

// // Hide an item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     console.warn('Clicked');
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }
