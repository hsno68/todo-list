import getDOMElements from "./../utility/dom.js";
import generateId from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/todoFormSetup.js";
import { defaultProject } from "./projectMaker.js";

export default class TodoMaker {
  static #DOM = getDOMElements();
  #todoId = generateId();

  constructor({ title, description, due, priority }) {
    this.#assignProperties({ title, description, due, priority });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title, description, due, priority }) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;
  }

  get id() {
    return this.#todoId;
  }

  update({ title, description, due, priority }) {
    this.#assignProperties({ title, description, due, priority });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #render() {
    const div = document.createElement("div");
    div.classList.add("box");

    for (const prop in this) {
      if (prop === "element") {
        continue;
      }

      const content = document.createElement("p");
      content.textContent = this[prop];
      div.appendChild(content);
    }

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.textContent = "Delete";

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      defaultProject.delete(this);
      defaultProject.renderTodos();
    });

    div.appendChild(button);

    return div;
  }

  #setupEventListeners() {
    const { todoDialog } = TodoMaker.#DOM;

    this.element.addEventListener("click", () => {
      setupTodoDialogForm({ mode: "edit", todo: this});
      todoDialog.showModal();
    });
  }
}