import getDOMElements from "./../utility/dom.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupFilterEvents from "./setupFilterEvents.js";
import setupProjectDialogForm from "./../UI/formSetup/setupProjectDialogForm.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import projectFormSubmitHandler from "./../UI/formSubmit/projectFormSubmitHandler.js";
import todoFormSubmitHandler from "./../UI/formSubmit/todoFormSubmitHandler.js";
import { getCurrentFilterContext, getCurrentProject, getCurrentTodo } from "../utility/contextController.js";

export default function setupEventListeners() {
  const {
    addProjectButton,
    addTodoButton,
    projectFormCancelButton,
    todoFormCancelButton,
    projectDialog,
    projectForm,
    todoDialog,
    todoForm,
    dueInput,
    inbox,
    today,
    week,
    important,
    completed,
  } = getDOMElements();

  const filters = [
    { button: inbox, filter: "inbox", },
    { button: today, filter: "today", },
    { button: week, filter: "week", },
    { button: important, filter: "important", },
    { button: completed, filter: "completed", },
  ];

  setupDialogEvents({
    addButton: addProjectButton,
    cancelButton: projectFormCancelButton,
    dialog: projectDialog,
    form: projectForm,
    setupForm: setupProjectDialogForm,
    submitHandler: projectFormSubmitHandler,
  });

  setupDialogEvents({
    addButton: addTodoButton,
    cancelButton: todoFormCancelButton,
    dialog: todoDialog,
    form: todoForm,
    setupForm: setupTodoDialogForm,
    submitHandler: todoFormSubmitHandler,
  });

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