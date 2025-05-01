export default function addTaskItem(taskId, taskCollectionObject, taskCollectionArray, taskItem) {
  taskCollectionObject[taskId] = taskItem;
  taskCollectionArray.push(taskId);
}