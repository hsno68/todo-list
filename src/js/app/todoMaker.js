import { generateId, createTodoElement, createButton } from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";

export default class TodoMaker {
  #todoId = generateId();

  constructor({ title, description, due, completed }) {
    this.#assignProperties({ title, description, due, completed });
    this.element = this.#render();
  }

  #assignProperties({ title, description, due, completed }) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.completed = completed;
  }

  get id() {
    return this.#todoId;
  }

  update({ title, description, due, completed }) {
    this.#assignProperties({ title, description, due, completed });
    this.element = this.#render();
  }

  #render() {
    const container = document.createElement("div");
    container.classList.add("border-container");

    const todo = createTodoElement(this);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: (event) => {
        event.stopPropagation();
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
}