import getDOMElements from "./../utility/dom.js";
import projectManager from "./projectManager.js";
import { generateId, createProjectElement, createButton } from "./../utility/utility.js";
import setupProjectDialogForm from "./../UI/formSetup/setupProjectDialogForm.js";
import projectDeleteHandler from "./../UI/deleteHandler/projectDeleteHandler.js";

export default class ProjectMaker {
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor({ title }) {
    this.#assignProperties({ title });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title }) {
    if (title.trim() === "") {
      this.title = "Untitled";
    }
    else {
      this.title = title;
    }
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

  getAllTodos() {
    return this.#todoIds.map(todoId => this.#todosByIds[todoId]);
  }

  renderTodos() {
    const { label, todosContainer } = getDOMElements();
    label.textContent = this.title;
    todosContainer.replaceChildren();

    for (const todoId of this.#todoIds) {
      const todo = this.#todosByIds[todoId];
      todo.projectTitle = this.title;
      todo.element.querySelector(".todo-project").textContent = this.title;
      todosContainer.appendChild(todo.element);
    }
  }

  #render() {
    const project = createProjectElement(this);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: (event) => {
        event.stopPropagation();
        projectManager.currentProject = this;
        setupProjectDialogForm({ mode: "edit", project: this});
      }
    });

    const deleteButton = createButton({
      iconName: "delete",
      buttonClass: "delete-button",
      callback: (event) => {
        event.stopPropagation();
        projectDeleteHandler(this);
      }
    });

    buttons.append(editButton, deleteButton);
    project.appendChild(buttons);

    return project;
  }

  #setupEventListeners() {
    this.element.addEventListener("click", () => {
      projectManager.currentProject = this;
      this.renderTodos();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});