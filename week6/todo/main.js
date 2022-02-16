import toDos from "./modules/toDos.js";

//Create instance of ToDos object
var _toDos =
  new toDos(document.getElementById("taskList"),111);
_toDos.listToDos();

//Add listenter to 'All' filter button
document.getElementById("add_todo").addEventListener("click", () => {
  _toDos.addToDo();
});

//Add listenter to 'Active' filter button
document.getElementById("filter_all").addEventListener("click", () => {
  _toDos.filterToDos('all');
});

//Add listenter to 'Complete' filter button
document.getElementById("filter_active").addEventListener("click", () => {
  _toDos.filterToDos('active');
});

//Add listenter to add task button
document.getElementById("filter_complete").addEventListener("click", () => {
  _toDos.filterToDos('complete');
});
