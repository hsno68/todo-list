import { generateId, createTodoElement, createButton, toggleCheckbox, toggleImportant } from "./../utility/utility.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";

export default class TodoMaker {
  #todoId = generateId();

  constructor({ title, description, due, project}) {
    this.completed = false;
    this.important = false;
    this.#assignProperties({ title, description, due, project });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title, description, due, project }) {
    if (title.trim() === "") {
      this.title = "Untitled";
    }
    else {
      this.title = title;
    }
    this.description = description;
    this.project = project;
    this.due = due;
  }

  get id() {
    return this.#todoId;
  }

  update({ title, description, due, project }) {
    this.#assignProperties({ title, description, due, project });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #render() {
    const todo = createTodoElement(this);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const importantButton = createButton({
      iconName: "star",
      buttonClass: "important-button",
      callback: (event) => {
        event.stopPropagation();
        toggleImportant(this);
        this.element.classList.toggle("important", this.important);
      }
    });

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

    buttons.append(importantButton, editButton, deleteButton);
    todo.appendChild(buttons);

    return todo;
  }

  #setupEventListeners() {
    const checkbox = this.element.querySelector('input[type="checkbox"]');
    this.element.addEventListener("click", (event) => {
      toggleCheckbox(this, checkbox, event);
      this.element.classList.toggle("completed", this.completed);
      console.log(this);
    });
  }
}