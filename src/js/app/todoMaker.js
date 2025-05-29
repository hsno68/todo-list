import getDOMElements from "./../utility/dom.js";
import { generateId, createButton } from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";

export default class TodoMaker {
  static #DOM = getDOMElements();
  #todoId = generateId();

  constructor({ title, description, due, priority }) {
    this.#assignProperties({ title, description, due, priority });
    this.element = this.#render();
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
    const { todoDialog } = TodoMaker.#DOM;

    const container = document.createElement("div");
    container.classList.add("border-container");

    const todo = document.createElement("div");
    todo.classList.add("todo");

    for (const prop in this) {
      if (prop === "element") {
        continue;
      }
      const content = document.createElement("p");
      content.textContent = this[prop];
      todo.appendChild(content);
    }

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: () => {
        setupTodoDialogForm({ mode: "edit", todo: this});
        todoDialog.showModal();
      }
    });

    const deleteButton = createButton({
      iconName: "delete",
      buttonClass: "delete-button",
      callback: (event) => {
        event.stopPropagation();
        todoDeleteHandler(this);
      }
    });

    buttons.append(editButton, deleteButton);
    todo.appendChild(buttons);
    container.appendChild(todo);

    return container;
  }
}