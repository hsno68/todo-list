import projectManager from "./projectManager.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";
import { generateId, createTodoElement, createButton, toggleCheckbox, toggleImportant } from "./../utility/utility.js";
import { setCurrentProjectContext } from "./../utility/contextController.js";

export default class TodoMaker {
  #todoId = generateId();

  constructor({ title, description, due, important, completed, projectId, projectTitle }) {
    this.#assignProperties({ title, description, due, projectId, projectTitle });
    this.important = important;
    this.completed = completed;
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title, description, due, projectId, projectTitle }) {
    if (title.trim() === "") {
      this.title = "Untitled";
    }
    else {
      this.title = title;
    }
    this.description = description;
    this.due = due;
    this.projectId = projectId;
    this.projectTitle = projectTitle;
  }

  get id() {
    return this.#todoId;
  }

  update({ title, description, due, projectId, projectTitle }) {
    this.#assignProperties({ title, description, due, projectId, projectTitle });
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
        const projectId = this.projectId;
        const project = projectManager.get(projectId);
        setCurrentProjectContext(project);
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
    });
  }
}