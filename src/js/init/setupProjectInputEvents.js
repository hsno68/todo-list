import projectFormSubmitHandler from "./../UI/formSubmit/projectFormSubmitHandler.js";

export default function setupProjectInputEvents({ form, input, mode, currentProjectEdit, currentProjectElement }) {
  let hasSubmitted = false;

  let isCreating = mode === "add";
  let isEditing = mode === "edit";

  function submitForm() {
    if (hasSubmitted) {
      return;
    }
    hasSubmitted = true;

    const projectFormObject = Object.fromEntries(new FormData(form).entries());
    projectFormSubmitHandler({ projectFormObject, mode, currentProjectEdit })
    form.remove();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
  });

  input.addEventListener("blur", () => {
    submitForm();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hasSubmitted = true;
      if (isCreating) {
        form.remove();
      }
      else if (isEditing) {
        form.replaceWith(currentProjectElement);
      }
    }
  });
}