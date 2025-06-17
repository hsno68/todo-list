import { getCurrentFilterContext, resetCurrentProject } from "./../utility/contextController";

export default function setupDialogEvents({ addButton, cancelButton, dialog, form, setupForm, submitHandler }) {
  addButton.addEventListener("click", () => {
    setupForm({ mode: "add" });
  });

  cancelButton.addEventListener("click", () => {
    if (getCurrentFilterContext() !== null) {
      resetCurrentProject();
    }
    dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitType = event.submitter.value;
    const formObject = Object.fromEntries(new FormData(form));
    submitHandler(formObject, submitType);
  });
}