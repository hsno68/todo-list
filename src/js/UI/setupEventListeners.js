import getDOMElements from "./../utility/dom.js";
import setupProjectDialogForm from "./formSetup/projectFormSetup.js";
import setupTodoDialogForm from "./formSetup/todoFormSetup.js";
import projectFormSubmitHandler from "./formSubmit/projectFormSubmit.js";
import todoFormSubmitHandler from "./formSubmit/todoFormSubmit.js";

export default function setupEventListeners() {
  const {
    addProjectButton,
    addTodoButton,
    projectCancelButton,
    todoCancelButton,
    projectDialog,
    projectForm,
    todoDialog,
    todoForm
  } = getDOMElements();

  addProjectButton.addEventListener("click", () => {
    setupProjectDialogForm({mode: "add"});
    projectDialog.showModal();
  })

  projectCancelButton.addEventListener("click", () => {
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

  todoCancelButton.addEventListener("click", () => {
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