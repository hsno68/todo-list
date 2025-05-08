export default class ProjectMaker {
  constructor(title) {
    this.title = title;
    this.todosByIds = {};
    this.allTodoIds = [];
  }
}