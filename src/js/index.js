import "./../css/styles.css";
import TaskMaker from "./taskMaker.js";
import generateId from "./idGenerator.js";
import addTaskItem from "./taskAdder.js";

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", updateState);
}

const taskState = {
  tasksByIds: {},
  allTaskIds: [],
};

function updateState() {
  let taskId = generateId();
  //Regenerate a new task Id if task Id already exists
  while (taskState.tasksByIds.hasOwnProperty(taskId)) {
    taskId = generateId();
  }

  const taskItem = new TaskMaker(
    prompt("Name of Task"),
    prompt("Description"),
    prompt("Due"),
    prompt("Priority"),
    prompt("Notes"),
    prompt("Status")
  );

  addTaskItem(taskState, taskId, taskItem);
  console.log(taskState);
}