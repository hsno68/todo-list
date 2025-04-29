export default function addTaskItem(taskState, taskId, taskItem) {
  taskState.tasksByIds[taskId] = taskItem;
  taskState.allTaskIds.push(taskId);
}