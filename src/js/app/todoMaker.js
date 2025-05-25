import getDOMElements from "./../utility/dom.js";
import generateId from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/todoFormSetup.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";

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
    const containingDiv = document.createElement("div");
    containingDiv.classList.add("border-container");

    const div = document.createElement("div");
    div.classList.add("todo");

    for (const prop in this) {
      if (prop === "element") {
        continue;
      }

      const content = document.createElement("p");
      content.textContent = this[prop];
      div.appendChild(content);
    }

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("material-symbols-rounded", "delete-button");
    deleteSpan.textContent = "delete";
    deleteSpan.addEventListener("click", (event)=> {
      event.stopPropagation();
      todoDeleteHandler(this);
    });
    deleteButton.appendChild(deleteSpan);

    buttonsDiv.appendChild(deleteButton);

    div.append(buttonsDiv);
    containingDiv.appendChild(div);

    return containingDiv;
  }

  #setupEventListeners() {
    const { todoDialog } = getDOMElements();

    this.element.addEventListener("click", (event) => {
      setupTodoDialogForm({ mode: "edit", todo: this});
      todoDialog.showModal();
    });
  }
}