import getDOMElements from "./../utility/dom.js";

class ProjectManager {
  static #DOM = getDOMElements();
  #projectsByIds = {};
  #projectIds = [];

  add(project) {
    this.#projectsByIds[project.id] = project;
    this.#projectIds.push(project.id);
  }

  get(projectId) {
    return this.#projectsByIds[projectId];
  }
  
  update(project) {
    this.#projectsByIds[project.id] = project;
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