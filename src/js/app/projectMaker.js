import getDOMElements from "./../utility/dom.js";
import generateId from "./../utility/utility.js";
import setupProjectDialogForm from "./../UI/formSetup/projectFormSetup.js";

export default class ProjectMaker {
  static #DOM = getDOMElements();
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor({ title }) {
    this.title = title;
    this.element = this.#render();
    this.#setupEventListeners();
  }

  get id() {
    return this.#projectId;
  }

  get(todoId) {
    return this.#todosByIds[todoId];
  }

  update({ title }) {
    this.title = title;
    this.element = this.#render();
    this.#setupEventListeners();
  }

  add(todo) {
    this.#todosByIds[todo.id] = todo;
    this.#todoIds.push(todo.id);
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

  renderTodos() {
    const { todosContainer } = ProjectMaker.#DOM;
    todosContainer.replaceChildren();

    for (const todoId of this.#todoIds) {
      todosContainer.appendChild(this.#todosByIds[todoId].element);
    }
  }

  #setupEventListeners() {
    const { projectDialog } = ProjectMaker.#DOM;

    this.element.addEventListener("click", () => {
      setupProjectDialogForm({ mode: "edit", project: this});
      projectDialog.showModal();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});