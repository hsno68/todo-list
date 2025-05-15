import getDOMElements from "./utils/dom.js";
import { formSubmitHandler, setupDialogForm } from "./utils/utility.js";

export default function setupEventListeners() {
  const { addProjectButton, addTodoButton, projectCancelButton, projectSubmitButton, todoCancelButton, projectDialog, projectForm, todoDialog, todoForm } = getDOMElements();

  addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
    console.log("show")
  })

  projectCancelButton.addEventListener("click", () => {
    console.log('cancel')
    projectDialog.close();
  });

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;
    
    const formData = new FormData(projectForm);
    const formObject = Object.fromEntries(formData.entries());

    projectDialog.close();
  });

  addTodoButton.addEventListener("click", () => {
    setupDialogForm({ mode: "add" });
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

    formSubmitHandler(formObject, submitType);

    todoDialog.close();
  });
}