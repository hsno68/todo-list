import getDOMElements from "./../utility/dom.js";
import setupProjectInputEvents from "./setupProjectInputEvents.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupFilterEvents from "./setupFilterEvents.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import todoFormSubmitHandler from "./../UI/formSubmit/todoFormSubmitHandler.js";
import { createFormElement } from "./../utility/utility.js";

export default function setupEventListeners() {
  const {
    addProjectButton,
    projectsContainer,
    addTodoButton,
    todoFormCancelButton,
    todoDialog,
    todoForm,
    dueInput,
    inbox,
    today,
    week,
    important,
    completed,
  } = getDOMElements();

  addProjectButton.addEventListener("click", () => {
    const form = createFormElement({ mode: "add" });
    const input = form.querySelector("input");
    setupProjectInputEvents({ form, input, mode: "add" });
    projectsContainer.appendChild(form);
  });

  setupDialogEvents({
    addButton: addTodoButton,
    cancelButton: todoFormCancelButton,
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
}