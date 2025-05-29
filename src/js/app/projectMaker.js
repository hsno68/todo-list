import getDOMElements from "./../utility/dom.js";
import { generateId } from "./../utility/utility.js";
import setupProjectDialogForm from "./../UI/formSetup/setupProjectDialogForm.js";
import projectDeleteHandler from "./../UI/deleteHandler/projectDeleteHandler.js";

export default class ProjectMaker {
  static #DOM = getDOMElements();
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor({ title }) {
    this.#assignProperties({ title });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title }) {
    this.title = title;
  }

  get id() {
    return this.#projectId;
  }

  get(todoId) {
    return this.#todosByIds[todoId];
  }

  update({ title }) {
    this.#assignProperties({ title });
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
    const { todosContainer, projectDialog } = ProjectMaker.#DOM;

    const div = document.createElement("div");
    div.classList.add("project");

    const content = document.createElement("p");
    content.textContent = this.title;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    const editSpan = document.createElement("span");
    editSpan.classList.add("material-symbols-rounded");
    editSpan.textContent = "edit_square";
    editSpan.addEventListener("click", () => {
      setupProjectDialogForm({ mode: "edit", project: this});
      projectDialog.showModal();
    });
    editButton.appendChild(editSpan);

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("material-symbols-rounded", "delete-button");
    deleteSpan.textContent = "delete";
    deleteSpan.addEventListener("click", (event) => {
      event.stopPropagation();
      projectDeleteHandler(this);
    });
    deleteButton.appendChild(deleteSpan);

    buttonsDiv.append(editButton, deleteButton);

    div.append(content, buttonsDiv);

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
    const { projectForm } = ProjectMaker.#DOM;
    this.element.addEventListener("click", () => {
      projectForm.setAttribute("data-project-id", this.id);
      this.renderTodos();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});