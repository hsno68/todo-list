import getDOMElements from "./../../utility/dom.js";


export default function setupProjectDialogForm({ mode, project }) {
  const {
    projectForm,
    projectSubmitButton,
    projectTitleInput
  } = getDOMElements();

  if (mode === "add") {
    projectForm.reset();

    projectSubmitButton.textContent = "Add";
    projectSubmitButton.value = "confirm";
  }

  if (mode === "edit") {
    projectForm.setAttribute("data-project-id", project.id);

    projectTitleInput.value = project.title;

    projectSubmitButton.textContent = "Update";
    projectSubmitButton.value = "update";
  }
}