export default class ProjectMaker {
  constructor(title) {
    this.title = title;
    this.todosByIdsObject = {};
    this.allTodoIdsArray = [];
  }
}