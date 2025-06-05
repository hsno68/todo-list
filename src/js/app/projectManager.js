import getDOMElements from "./../utility/dom.js";

class ProjectManager {
  #projectsByIds = {};
  #projectIds = [];

  get(projectId) {
    return this.#projectsByIds[projectId];
  }

  add(project) {
    this.#projectsByIds[project.id] = project;
    this.#projectIds.push(project.id);
  }

  edit(project) {
    this.#projectsByIds[project.id] = project;
  }

  delete(project) {
    delete this.#projectsByIds[project.id];
    const toBeDeletedProjectIndex = this.#projectIds.indexOf(project.id);
    this.#projectIds.splice(toBeDeletedProjectIndex, 1);
  }

  getAllTodos() {
    return this.#projectIds.flatMap(projectId => {
      const project = this.#projectsByIds[projectId];
      return project.getAllTodos();
    });
  }

  render() {
    const { projectsContainer } = getDOMElements();
    projectsContainer.replaceChildren();

    for (const projectId of this.#projectIds) {
      projectsContainer.appendChild(this.#projectsByIds[projectId].element);
    }
  }
}

export default new ProjectManager();