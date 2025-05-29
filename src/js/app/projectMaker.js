import getDOMElements from "./../utility/dom.js";
import { generateId, createItem, createButton } from "./../utility/utility.js";
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

  renderTodos() {
    const { todosContainer } = ProjectMaker.#DOM;
    todosContainer.replaceChildren();

    for (const todoId of this.#todoIds) {
      todosContainer.appendChild(this.#todosByIds[todoId].element);
    }
  }

  #render() {
    const { projectDialog } = ProjectMaker.#DOM;

    const project = createItem({
      className: "project",
      object: this
    });

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: () => {
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
    const { projectForm } = ProjectMaker.#DOM;
    this.element.addEventListener("click", () => {
      projectForm.setAttribute("data-project-id", this.id);
      this.renderTodos();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});