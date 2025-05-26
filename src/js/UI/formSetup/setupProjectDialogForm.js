import getDOMElements from "./../../utility/dom.js";

export default function setupProjectDialogForm({ mode, project }) {
  const {
    projectForm,
    projectFormSubmitButton,
    projectTitleInput
  } = getDOMElements();

  if (mode === "add") {
    projectForm.reset();

    projectFormSubmitButton.textContent = "Add";
    projectFormSubmitButton.value = "confirm";
  }

  if (mode === "edit") {
    projectTitleInput.value = project.title;

    projectFormSubmitButton.textContent = "Update";
    projectFormSubmitButton.value = "update";
  }
}