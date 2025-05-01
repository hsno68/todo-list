export default class TaskMaker {
  constructor(taskId, title, description, due, priority) {
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;
  }
}