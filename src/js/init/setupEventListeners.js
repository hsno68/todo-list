import getDOMElements from "./../utility/dom.js";
import setupDialogEvents from "./setupDialogEvents.js";
import setupProjectDialogForm from "./../UI/formSetup/setupProjectDialogForm.js";
import setupTodoDialogForm from "./../UI/formSetup/setupTodoDialogForm.js";
import projectFormSubmitHandler from "./../UI/formSubmit/projectFormSubmitHandler.js";
import todoFormSubmitHandler from "./../UI/formSubmit/todoFormSubmitHandler.js";
import projectManager from "../app/projectManager.js";

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
    inbox
  } = getDOMElements();

  setupDialogEvents({
    addButton: addProjectButton,
    cancelButton: projectFormCancelButton,
    dialog: projectDialog,
    form: projectForm,
    setupForm: setupProjectDialogForm,
    submitHandler: projectFormSubmitHandler
  });

  setupDialogEvents({
    addButton: addTodoButton,
    cancelButton: todoFormCancelButton,
    dialog: todoDialog,
    form: todoForm,
    setupForm: setupTodoDialogForm,
    submitHandler: todoFormSubmitHandler
  });

  dueInput.addEventListener('click', () => {
    if (dueInput.disabled || dueInput.readOnly) {
      return;
    }

    if (typeof dueInput.showPicker === 'function') {
      dueInput.showPicker();
    }
  });

  inbox.addEventListener("click", () => {
    projectManager.renderTodos("inbox");
  });
}