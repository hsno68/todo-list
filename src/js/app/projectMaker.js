import getDOMElements from "./../utility/dom.js";
import TodoMaker from "./todoMaker.js";
import setupProjectInputEvents from "./../init/setupProjectInputEvents.js";
import setupDeleteDialogForm from "./../UI/formSetup/setupDeleteDialogForm.js";
import { generateId, createFormElement, createProjectElement, createButton, persistAppState, toggleSelectedTab } from "./../utility/utility.js";
import { setCurrentProjectContext, setCurrentFilterContext } from "./../utility/contextController.js";

export default class ProjectMaker {
  #projectId = generateId();
  #todosByIds = {};
  #todoIds = [];

  constructor({ title, isSelected }) {
    this.#assignProperties({ title });
    this.element = this.#render(isSelected);
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
    const project = new ProjectMaker({...data, isSelected: false});
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

  update({ title, isSelected }) {
    this.#assignProperties({ title });
    this.element = this.#render(isSelected);
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

  #render(isSelected) {
    const project = createProjectElement({ project: this, isSelected});

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const dropdownButton = createButton({
      iconName: "more_vert",
      buttonClass: "dropdown",
      callback: (event) => {
        event.stopPropagation();
        buttons.classList.toggle("open");
      }
    });

    const editButton = createButton({
      iconName: "edit",
      text: "Rename",
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
      text: "Delete",
      buttonClass: "delete-button",
      callback: (event) => {
        event.stopPropagation();
        setupDeleteDialogForm({ mode: "project", project: this });
      }
    });

    buttons.append(editButton, deleteButton);
    project.append(dropdownButton, buttons);

    return project;
  }

  #setupEventListeners() {
    this.element.addEventListener("click", () => {
      toggleSelectedTab(this.element);
      setCurrentFilterContext(null);
      setCurrentProjectContext(this);
      persistAppState();
      this.renderTodos();
    });
  }
}

export const defaultProject = new ProjectMaker({title: "Untitled"});