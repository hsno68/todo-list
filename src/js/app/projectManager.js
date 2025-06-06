import getDOMElements from "./../utility/dom.js";
import { isDueThisWeek } from "./../utility/utility.js";

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

  getInboxTodos() {
    return this.getAllTodos();
  }

  getTodayTodos() {
    const today = new Date().toISOString().split("T")[0];
    return this.getAllTodos.filter(todo => todo.due === today);
  }

  getWeekTodos() {
    return this.getAllTodos.filter(todo => isDueThisWeek(todo.due));
  }

  getCompletedTodos() {
    return this.getAllTodos().filter(todo => todo.completed);
  }

  renderProjects() {
    const { projectsContainer } = getDOMElements();
    projectsContainer.replaceChildren();

    for (const projectId of this.#projectIds) {
      projectsContainer.appendChild(this.#projectsByIds[projectId].element);
    }
  }
}

export default new ProjectManager();