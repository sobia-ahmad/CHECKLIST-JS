// TO DO LIST

// Variables declared for the following:
// New task, add button, complete tasks and incomplete tasks

let taskInput = document.getElementById("new-task"); // new-task
let addButton = document.getElementsByTagName("button")[0]; // first button
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); // incomplete-tasks
let completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New task item

let createNewTaskElement = function (taskString) {
  // Creates a list item
  let listItem = document.createElement("li");
  // Inputs the checkbox
  let checkBox = document.createElement("input");
  // Label
  let label = document.createElement("label");
  // Inputs (string)
  let editInput = document.createElement("input");
  // button.edit
  let editSquareButton = document.createElement("button");
  // button.delete
  let deleteSquareButton = document.createElement("button");

  // Every area gets modified here

  checkBox.type = "checkBox";
  editInput.type = "text";

  editSquareButton.innerText = "Edit";
  editSquareButton.className = "edit";
  deleteSquareButton.innerText = "Delete";
  deleteSquareButton.className = "delete";

  label.innerText = taskString;

  // Each element gets appended here

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editSquareButton);
  listItem.appendChild(deleteSquareButton);

  return listItem;
};

// Adds a new task
let addTask = function () {
  console.log("Add Task...");
  // Creates a new list item with the text from the #new-task:
  let listItem = createNewTaskElement(taskInput.value);
  // Appends listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

// Edits an already existent task
let editTask = function () {
  console.log("Edit Task...");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");

  let containsClass = listItem.classList.contains("editMode");

  // If the class of the parent is within .editMode,
  if (containsClass) {
    // then, switch from .editMode
    // after, label text becomes the input's value
    label.innerText = editInput.value;
  } else {
    // Switches to .editMode
    // then input value becomes the labels text
    editInput.value = label.innerText;
  }
  // Toggles .editMode on the parent
  listItem.classList.toggle("editMode");
};

// Deletes an existing task
let deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  ul.removeChild(listItem);
};

// Marks as the task is achieved or complete
let taskCompleted = function () {
  console.log("Task Complete...");
  // When the Checkbox is checked
  // this appends the task list item to the #completed-tasks ul
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Highlights a task as unachieved or incomplete
let taskIncomplete = function () {
  console.log("Task Incomplete...");
  // when the checkbox is unchecked appendTo #incomplete-tasks
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Sets the click handler to the addTask function here
addButton.addEventListener("click", addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // Selects list items' chidlren
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let editSquareButton = taskListItem.querySelector("button.edit");
  let deleteSquareButton = taskListItem.querySelector("button.delete");
  // Connects editTask to edit button
  editSquareButton.onclick = editTask;
  // Connects deleteTask to delete button
  deleteSquareButton.onclick = deleteTask;
  // Connects checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

// Cycles over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // Connects events to list items' children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// Cycles over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // Connects events to list items' children (This is called taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
