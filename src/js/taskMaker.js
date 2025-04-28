export default class TaskMaker {
  constructor(title, description, due, priority, notes, status) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;
    this.notes = notes;
    this.status = status;
  }
}