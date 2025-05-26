export default function setupDialogEvents({ addButton, cancelButton, dialog, form, setupFormFunction, submitHandler }) {
  addButton.addEventListener("click", () => {
    setupFormFunction({ mode: "add" });
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

    submitHandler(formObject, submitType);
    dialog.close();
  });
}