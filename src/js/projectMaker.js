export default class ProjectMaker {
  constructor(projectId, name) {
    this.projectId = projectId;
    this.name = name;
    this.tasksByIds = {};
    this.allTaskIds = [];
  }
}