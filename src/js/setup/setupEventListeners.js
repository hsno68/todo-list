import getDOMElements from "./../utility/dom";
import { formSubmitHandler } from "./handler.js";

export default function setupEventListeners() {
  const { addTodoButton, cancelButton, dialog, form } = getDOMElements();

  addTodoButton.addEventListener("click", () => {
    dialog.showModal();
  });

  cancelButton.addEventListener("click", () => {
    dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    formSubmitHandler(formObject);
    form.reset();
    dialog.close()
  });
}