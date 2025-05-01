import generateId from "./idGenerator.js";

export default function addTaskItem(taskStateObject, taskStateArray, taskItem) {
  let taskId = generateId();
  //Regenerate a new task Id if task Id already exists
  while (taskStateObject.hasOwnProperty(taskId)) {
    taskId = generateId();
  }
  taskStateObject[taskId] = taskItem;
  taskStateArray.push(taskId);
}