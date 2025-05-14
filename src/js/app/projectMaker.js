import getDOMElements from "./../setup/utils/dom.js";
import { generateId } from "./../setup/utils/utility.js";

export default class ProjectMaker {
  static #DOM = getDOMElements();
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor(title) {
    this.title = title;
    this.element = this.#render();
  }

  get id() {
    return this.#projectId;
  }

  add(todo) {
    this.#todosByIds[todo.id] = todo;
    this.#todoIds.push(todo.id);
  }
  
  get(id) {
    return this.#todosByIds[id];
  }

  edit(todo) {
    this.#todosByIds[todo.id] = todo;
  }

  #render() {
    const div = document.createElement("div");
    div.classList.add("box");
    const content = document.createElement("p");
    content.textContent = this.title;
    div.appendChild(content);
    return div;
  }

  renderTodoItems() {
    const { todosContainer } = ProjectMaker.#DOM;
    todosContainer.replaceChildren();
    for (const todoId in this.#todosByIds) {
      todosContainer.appendChild(this.#todosByIds[todoId].element);
    }
  }
}

export function addTodo(project, todo) {
  project.add(todo);
}

export function editTodo(project, todo) {
  project.edit(todo);
}

export function renderTodos(project) {
  project.renderTodoItems();
}

export const defaultProject = new ProjectMaker("Untitled");