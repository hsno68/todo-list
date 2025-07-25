import getDOMElements from "./../utility/dom.js";
import setupProjectInputEvents from "./setupProjectInputEvents.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupDialogCloseEvents from "./setupDialogCloseEvents.js";
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
    menuToggle,
    sidebar,
    overlay,
  } = getDOMElements();

  // Add todo button and todo dialog/form
  setupDialogEvents({
    addButton: addTodoButton,
    cancelButton: todoFormCancelButton,
    closeButton: todoDialogCloseButton,
    dialog: todoDialog,
    form: todoForm,
    setupForm: setupTodoDialogForm,
    submitHandler: todoFormSubmitHandler,
  });

  // Filter nav tabs
  const filters = [
    { button: inbox, filter: "inbox", },
    { button: today, filter: "today", },
    { button: week, filter: "week", },
    { button: important, filter: "important", },
    { button: completed, filter: "completed", },
  ];

  filters.forEach(filter => setupFilterEvents(filter));

  // Projects
  addProjectButton.addEventListener("click", () => {
    const form = createFormElement({ mode: "add" });
    const input = form.querySelector("input");
    projectsContainer.appendChild(form);
    setupProjectInputEvents({ form, input, mode: "add" });
  });

  //Close dialog events for delete dialog/form
  setupDialogCloseEvents({
    cancelButton: deleteFormCancelButton,
    closeButton: deleteDialogCloseButton,
    dialog: deleteDialog,
  });

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

  //Allows entire date picker input to be clicked
  dueInput.addEventListener('click', () => {
    if (dueInput.disabled || dueInput.readOnly) {
      return;
    }
    if (typeof dueInput.showPicker === 'function') {
      dueInput.showPicker();
    }
  });

  //Closes all (usually one) opened dropdowns when clicking anywhere not inside the opened dropdown
  document.addEventListener("click", (event) => {
    const openDropdown = document.querySelector(".buttons.open");
    if (openDropdown && !openDropdown.contains(event.target)) {
      openDropdown.classList.remove("open");
    }
  });

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  });
}