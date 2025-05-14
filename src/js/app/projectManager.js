class ProjectManager {
  #projectsByIds = {};
  #projectIds = [];

  add(project) {
    this.#projectsByIds[project.id] = project;
    this.#projectIds.push(project.id);
  }
}

export default new ProjectManager();