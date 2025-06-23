export default function setupDialogEvents({ addButton, cancelButton, closeButton, dialog, form, setupForm, submitHandler }) {
  addButton.addEventListener("click", () => {
    setupForm({ mode: "add" });
  });

  cancelButton.addEventListener("click", () => dialog.close());

  closeButton.addEventListener("click", () => dialog.close());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;
    const formObject = Object.fromEntries(new FormData(form));
    submitHandler(formObject, submitType);
  });
}