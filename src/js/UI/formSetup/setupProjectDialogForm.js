import getDOMElements from "./../../utility/dom.js";

export default function setupProjectDialogForm({ mode, project }) {
  const {
    projectTitle,
    projectDialog,
    projectForm,
    projectFormSubmitButton,
    projectTitleInput
  } = getDOMElements();

  const config = {
    add: {
      reset: true,
      titleText: "New project",
      buttonText: "Add",
      buttonValue: "confirm"
    },
    edit: {
      reset: false,
      titleText: "Edit project",
      buttonText: "Update",
      buttonValue: "update"
    }
  };

  const { reset, titleText, buttonText, buttonValue } = config[mode];

  if (reset) {
    projectForm.reset();
  }

  if (project) {
    projectForm.setAttribute("data-project-id", project.id);
    projectTitleInput.value = project.title;
  }

  projectTitle.textContent = titleText;
  projectFormSubmitButton.textContent = buttonText;
  projectFormSubmitButton.value = buttonValue;
  projectDialog.showModal();
}