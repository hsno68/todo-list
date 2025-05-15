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
  
  getTodo(id) {
    return this.#todosByIds[id];
  }

  edit(todo) {
    this.#todosByIds[todo.id] = todo;
  }

  delete(todo) {
    delete this.#todosByIds[todo.id];
    const toBeDeletedTodoIndex = this.#todoIds.indexOf(todo.id);
    this.#todoIds.splice(toBeDeletedTodoIndex, 1);
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

    for (const todoId of this.#todoIds) {
      todosContainer.appendChild(this.#todosByIds[todoId].element);
    }
  }
}

export function addTodo(project, todo) {
  project.add(todo);
}

export function renderTodos(project) {
  project.renderTodoItems();
}

export function editTodo(project, todo) {
  project.edit(todo);
}

export function deleteTodos(project, todo) {
  project.delete(todo);
}

export const defaultProject = new ProjectMaker("Untitled");