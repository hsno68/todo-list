export default class ProjectManager {
  projectsByIdsObject = {};
  allProjectIdsArray = [];

  addProject(projectId, project) {
    this.projectsByIdsObject[projectId] = project;
    this.allProjectIdsArray.push(projectId);
  }
}