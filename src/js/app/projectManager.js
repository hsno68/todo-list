import getDOMElements from "./../utility/dom.js";

class ProjectManager {
  static #DOM = getDOMElements();
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

  render() {
    const { projectsContainer } = ProjectManager.#DOM;
    projectsContainer.replaceChildren();

    for (const projectId of this.#projectIds) {
      projectsContainer.appendChild(this.#projectsByIds[projectId].element);
    }
  }
}

export default new ProjectManager();