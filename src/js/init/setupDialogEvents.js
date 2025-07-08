import setupDialogCloseEvents from "./setupDialogCloseEvents.js";

export default function setupDialogEvents({ addButton, cancelButton, closeButton, dialog, form, setupForm, submitHandler }) {
  addButton.addEventListener("click", () => {
    setupForm({ mode: "add" });
  });

  setupDialogCloseEvents({
    cancelButton,
    closeButton,
    dialog,
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;
    const formObject = Object.fromEntries(new FormData(form));
    submitHandler(formObject, submitType);
  });
}