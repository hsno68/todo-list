import generateId from "./../utility/idGenerator.js";

export default class ProjectMaker {
  #projectId = generateId();
  #todosByIdsObject = {};
  #allTodoIdsArray = [];

  constructor(title) {
    this.title = title;
    this.element = this.#render();
  }

  get id() {
    return this.#projectId;
  }

  addTodo(todo) {
    this.#todosByIdsObject[todo.id] = todo;
    this.#allTodoIdsArray.push(todo.id);
  }

  #render() {
    const div = document.createElement("div");
    div.classList.add("box");
    const content = document.createElement("p");
    content.textContent = this.title;
    div.appendChild(content);
    return div;
  }
}

export const defaultProject = new ProjectMaker("Untitled");