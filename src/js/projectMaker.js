export default class ProjectMaker {
  constructor(projectId, name) {
    this.projectId = projectId;
    this.name = name;
    this.todosByIds = {};
    this.allTodoIds = [];
  }
}