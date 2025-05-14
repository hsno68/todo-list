import getDOMElements from "./utils/dom.js";
import { formSubmitHandler, setupDialogForm } from "./utils/utility.js";

export default function setupEventListeners() {
  const { addTodoButton, cancelButton, dialog, form } = getDOMElements();

  addTodoButton.addEventListener("click", () => {
    setupDialogForm({ mode: "add" });
    dialog.showModal();
  });

  cancelButton.addEventListener("click", () => {
    dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;
    
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    formSubmitHandler(formObject, submitType);

    dialog.close();
  });
}