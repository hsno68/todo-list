import getDOMElements from "./../utility/dom.js";
import setupProjectInputEvents from "./setupProjectInputEvents.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupFilterEvents from "./setupFilterEvents.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoFormSubmitHandler from "./../UI/formSubmit/todoFormSubmitHandler.js";
import todoDeleteHandler from "./../UI/deleteHandler/todoDeleteHandler.js";
import projectDeleteHandler from "./../UI/deleteHandler/projectDeleteHandler.js";
import { createFormElement } from "./../utility/utility.js";
import { getDeleteContext } from "./../UI/formSetup/setupDeleteDialogForm.js";

export default function setupEventListeners() {
  const {
    addProjectButton,
    projectsContainer,
    addTodoButton,
    todoFormCancelButton,
    todoDialogCloseButton,
    todoDialog,
    todoForm,
    dueInput,
    inbox,
    today,
    week,
    important,
    completed,
    deleteForm,
    deleteDialog,
    deleteFormCancelButton,
    deleteDialogCloseButton,
  } = getDOMElements();

  addProjectButton.addEventListener("click", () => {
    const form = createFormElement({ mode: "add" });
    const input = form.querySelector("input");
    projectsContainer.appendChild(form);
    setupProjectInputEvents({ form, input, mode: "add" });
  });

  setupDialogEvents({
    addButton: addTodoButton,
    cancelButton: todoFormCancelButton,
    closeButton: todoDialogCloseButton,
    dialog: todoDialog,
    form: todoForm,
    setupForm: setupTodoDialogForm,
    submitHandler: todoFormSubmitHandler,
  });

  const filters = [
    { button: inbox, filter: "inbox", },
    { button: today, filter: "today", },
    { button: week, filter: "week", },
    { button: important, filter: "important", },
    { button: completed, filter: "completed", },
  ];

  filters.forEach(filter => setupFilterEvents(filter));

  //Allows entire date picker input to be clicked
  dueInput.addEventListener('click', () => {
    if (dueInput.disabled || dueInput.readOnly) {
      return;
    }
    if (typeof dueInput.showPicker === 'function') {
      dueInput.showPicker();
    }
  });

  deleteFormCancelButton.addEventListener("click", () => deleteDialog.close());

  deleteDialogCloseButton.addEventListener("click", () => deleteDialog.close());

  deleteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { mode, item } = getDeleteContext();

    if (mode === "project") {
      projectDeleteHandler(item);
    }
    else if (mode === "todo") {
      todoDeleteHandler(item);
    }

    deleteDialog.close();
  });

  //Closes all (usually one) opened dropdowns when clicking anywhere not inside the opened dropdown
  document.addEventListener("click", (event) => {
    const openDropdown = document.querySelector(".buttons.open");
    if (openDropdown && !openDropdown.contains(event.target)) {
      openDropdown.classList.remove("open");
    }
  });
}