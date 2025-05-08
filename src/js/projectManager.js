export default class ProjectManager {
  currentProjectId;
  projectsByIdsObject = {};
  allProjectIdsArray = [];

  addProject(projectId, project) {
    this.projectsByIdsObject[projectId] = project;
    this.allProjectIdsArray.push(projectId);
  }
}