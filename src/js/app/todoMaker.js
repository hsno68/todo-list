import getDOMElements from "./../setup/utils/dom.js";
import { generateId, setupDialogForm } from "./../setup/utils/utility.js";

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
    return div;
  }

  #setupEventListeners() {
    const { dialog } = TodoMaker.#DOM;

    this.element.addEventListener("click", () => {
      setupDialogForm({ mode: "edit", todo: this});
      dialog.showModal();
    });
  }
}

export function updateTodo(todo, formObject) {
  todo.update(formObject);
}