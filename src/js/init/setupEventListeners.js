import getDOMElements from "./../utility/dom.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupFilterEvents from "./setupFilterEvents.js";
import setupProjectDialogForm from "./../UI/formSetup/setupProjectDialogForm.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import projectFormSubmitHandler from "./../UI/formSubmit/projectFormSubmitHandler.js";
import todoFormSubmitHandler from "./../UI/formSubmit/todoFormSubmitHandler.js";

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
    { button: inbox, filter: "inbox", labelText: "Inbox", },
    { button: today, filter: "today", labelText: "Today", },
    { button: week, filter: "week", labelText: "This Week", },
    { button: important, filter: "important", labelText: "Important", },
    { button: completed, filter: "completed", labelText: "Completed", },
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