import projectFormSubmitHandler from "./../UI/formSubmit/projectFormSubmitHandler.js";

export default function setupProjectInputEvents({ form, input, mode, currentProjectEdit, currentProjectElement }) {
  let hasSubmitted = false;

  const originalInputValue =  input.value.trim();

  const isCreating = mode === "add";
  const isEditing = mode === "edit";

  function submitForm() {
    if (hasSubmitted) {
      return;
    }
    hasSubmitted = true;

    const projectFormObject = Object.fromEntries(new FormData(form).entries());
    projectFormSubmitHandler({ projectFormObject, mode, currentProjectEdit })
    form.remove();
  }

  function cancelForm() {
    hasSubmitted = true;
    if (isCreating) {
      form.remove();
    } else if (isEditing) {
      form.replaceWith(currentProjectElement);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitForm();
  });

  input.addEventListener("blur", () => {
    const currentInputValue =  input.value.trim();
    const hasChanged = originalInputValue !== currentInputValue;

    if (hasChanged) {
      submitForm();
    }
    else {
      cancelForm();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cancelForm();
    }
  });
}