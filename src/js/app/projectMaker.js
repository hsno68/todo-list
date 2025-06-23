import getDOMElements from "./../utility/dom.js";
import TodoMaker from "./todoMaker.js";
import projectDeleteHandler from "./../UI/deleteHandler/projectDeleteHandler.js";
import setupProjectInputEvents from "./../init/setupProjectInputEvents.js";
import { generateId, createFormElement, createProjectElement, createButton, persistAppState } from "./../utility/utility.js";
import { setCurrentProjectContext, setCurrentFilterContext } from "./../utility/contextController.js";

export default class ProjectMaker {
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor({ title }) {
    this.#assignProperties({ title });
    this.element = this.#render();
    this.#setupEventListeners();
  }

  #assignProperties({ title }) {
    if (title.trim() === "") {
      this.title = "Untitled";
    }
    else {
      this.title = title;
    }
  }

  serialize() {
    return {
      id: this.#projectId,
      title: this.title,
      todos: this.#todoIds.map(todoId => this.#todosByIds[todoId].serialize()),
    }
  }

  static deserialize(data) {
    const project = new ProjectMaker(data);
    project.#projectId = data.id;

    for (const todoData of data.todos) {
      const todo = TodoMaker.deserialize(todoData);
      project.add(todo);
    }

    return project;
  }

  get id() {
    return this.#projectId;
  }

  get(todoId) {
    return this.#todosByIds[todoId];
  }

  update({ title }) {
    this.#assignProperties({ title });
    this.element = this.#render();
    this.#setupEventListeners();
    this.updateTodoProjectTitles();
  }

  updateTodoProjectTitles() {
    for (const todoId of this.#todoIds) {
      const todo = this.#todosByIds[todoId];
      todo.projectTitle = this.title;
      todo.element.querySelector(".todo-project").textContent = this.title;
    }
  }

  add(todo) {
    this.#todosByIds[todo.id] = todo;
    this.#todoIds.push(todo.id);
  }

  edit(todo) {
    this.#todosByIds[todo.id] = todo;
  }

  delete(todo) {
    delete this.#todosByIds[todo.id];
    const toBeDeletedTodoIndex = this.#todoIds.indexOf(todo.id);
    this.#todoIds.splice(toBeDeletedTodoIndex, 1);
  }

  getAllTodos() {
    return this.#todoIds.map(todoId => this.#todosByIds[todoId]);
  }

  renderTodos() {
    const { header, todosContainer } = getDOMElements();
    header.textContent = this.title;
    todosContainer.replaceChildren();

    for (const todoId of this.#todoIds) {
      const todo = this.#todosByIds[todoId];
      todosContainer.appendChild(todo.element);
    }
  }

  #render() {
    const project = createProjectElement(this);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const editButton = createButton({
      iconName: "edit_square",
      callback: (event) => {
        event.stopPropagation();
        const form = createFormElement({ mode: "edit", project: this });
        const input = form.querySelector("input");
        setupProjectInputEvents({
          form,
          input,
          mode: "edit",
          currentProjectEdit: this,
          currentProjectElement: this.element,
        });
        this.element.replaceWith(form);
      }
    });

    const deleteButton = createButton({
      iconName: "delete",
      buttonClass: "delete-button",
      callback: (event) => {
        event.stopPropagation();
        projectDeleteHandler(this);
      }
    });

    buttons.append(editButton, deleteButton);
    project.appendChild(buttons);

    return project;
  }

  #setupEventListeners() {
    this.element.addEventListener("click", () => {
      setCurrentFilterContext(null);
      setCurrentProjectContext(this);
      persistAppState();
      this.renderTodos();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});