import generateId from "./../utility/idGenerator.js";
import getDOMElements from "./../utility/dom.js";

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
      const content = document.createElement("p");
      content.textContent = this[prop];
      div.appendChild(content);
    }
    return div;
  }

  #setupEventListeners() {
    this.element.addEventListener("click", () => {
      TodoMaker.#DOM.titleInput.value = this.title;
      TodoMaker.#DOM.descriptionInput.value = this.description;
      TodoMaker.#DOM.dueInput.value = this.due;
      TodoMaker.#DOM.priorityInput.value = this.priority;
      TodoMaker.#DOM.confirmButton.textContent =  "Update";
      TodoMaker.#DOM.confirmButton.value = "update";
      TodoMaker.#DOM.dialog.showModal();
    });
  }
}