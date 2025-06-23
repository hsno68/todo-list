import projectManager from "./projectManager.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";
import { generateId, createTodoElement, createButton, toggleCheckbox, toggleImportant, persistAppState } from "./../utility/utility.js";

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

  serialize() {
    return {
      id: this.#todoId,
      title: this.title,
      description: this.description,
      due: this.due,
      important: this.important,
      completed: this.completed,
      projectId: this.projectId,
      projectTitle: this.projectTitle,
    }
  }

  static deserialize(data) {
    const todo = new TodoMaker(data);
    todo.#todoId = data.id;
    return todo;
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
        persistAppState();
      }
    });

    const editButton = createButton({
      iconName: "edit_square",
      callback: (event) => {
        event.stopPropagation();
        const projectId = this.projectId;
        const project = projectManager.get(projectId);
        setupTodoDialogForm({ mode: "edit", todo: this, project});
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
      persistAppState();
    });
  }
}