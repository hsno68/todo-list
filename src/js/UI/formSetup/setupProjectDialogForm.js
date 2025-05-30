import getDOMElements from "./../../utility/dom.js";

export default function setupProjectDialogForm({ mode, project }) {
  const {
    projectTitle,
    projectDialog,
    projectForm,
    projectFormSubmitButton,
    projectTitleInput
  } = getDOMElements();

  if (mode === "add") {
    projectTitle.textContent = "New project";
    projectForm.reset();

    projectFormSubmitButton.textContent = "Add";
    projectFormSubmitButton.value = "confirm";
  }

  if (mode === "edit") {
    projectTitle.textContent = "Edit project";
    projectTitleInput.value = project.title;

    projectFormSubmitButton.textContent = "Update";
    projectFormSubmitButton.value = "update";
  }

  projectDialog.showModal();
}