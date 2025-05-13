class ProjectManager {
  #projectsByIdsObject = {};
  #allProjectIdsArray = [];

  addProject(project) {
    this.#projectsByIdsObject[project.projectId] = project;
    this.#allProjectIdsArray.push(project.projectId);
  }
}

export default new ProjectManager();