import getDOMElements from "./../utility/dom.js";
import { generateId, createTodoElement, createButton } from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";

export default class TodoMaker {
  #todoId = generateId();

  constructor({ title, description, due, priority }) {
    this.#assignProperties({ title, description, due, priority });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title, description, due }) {
    this.title = title;
    this.description = description;
    this.due = due;
  }

  get id() {
    return this.#todoId;
  }

  update({ title, description, due }) {
    this.#assignProperties({ title, description, due });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #render() {
    const { todoDialog } = getDOMElements();

    const container = document.createElement("div");
    container.classList.add("border-container");

    const todo = createTodoElement(this);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: () => {
        setupTodoDialogForm({ mode: "edit", todo: this});
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

  #setupEventListeners() {
    const { todoForm } = getDOMElements();
    this.element.addEventListener("click", () => {
      todoForm.setAttribute("data-todo-id", this.id);
    });
  }
}