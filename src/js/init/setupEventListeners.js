import getDOMElements from "./../utility/dom.js";
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
    todoForm
  } = getDOMElements();

  addProjectButton.addEventListener("click", () => {
    setupProjectDialogForm({mode: "add"});
    projectDialog.showModal();
  })

  projectFormCancelButton.addEventListener("click", () => {
    projectDialog.close();
  });

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;

    const formData = new FormData(projectForm);
    const formObject = Object.fromEntries(formData.entries());

    projectFormSubmitHandler(formObject, submitType);

    projectDialog.close();
  });

  addTodoButton.addEventListener("click", () => {
    setupTodoDialogForm({ mode: "add" });
    todoDialog.showModal();
  });

  todoFormCancelButton.addEventListener("click", () => {
    todoDialog.close();
  });

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;

    const formData = new FormData(todoForm);
    const formObject = Object.fromEntries(formData.entries());

    todoFormSubmitHandler(formObject, submitType);

    todoDialog.close();
  });
}