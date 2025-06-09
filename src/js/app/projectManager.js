import getDOMElements from "./../utility/dom.js";
import { isDueToday, isDueThisWeek } from "./../utility/utility.js";

class ProjectManager {
  #projectsByIds = {};
  #projectIds = [];

  static #filters = {
    inbox: todos => todos,
    today: todos => todos.filter(todo => isDueToday(todo.due)),
    week: todos => todos.filter(todo => isDueThisWeek(todo.due)),
    important: todos => todos.filter(todo => todo.important),
    completed: todos => todos.filter(todo => todo.completed),
  };

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

  #getAllTodos() {
    return this.#projectIds.flatMap(projectId => {
      const project = this.#projectsByIds[projectId];
      return project.getAllTodos();
    });
  }

  #getFilteredTodos(filter) {
    const todos = this.#getAllTodos();
    filter = ProjectManager.#filters[filter];
    return filter(todos);
  }

  renderTodos(filter) {
    const { todosContainer } = getDOMElements();
    todosContainer.replaceChildren();

    const todos = this.#getFilteredTodos(filter);

    for (const todo of todos) {
      todosContainer.appendChild(todo.element);
    }
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