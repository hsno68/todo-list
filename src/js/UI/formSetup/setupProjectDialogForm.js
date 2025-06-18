import getDOMElements from "./../../utility/dom.js";

let currentProjectEdit;

export default function setupProjectDialogForm({ mode, project }) {
  const {
    projectHeader,
    projectDialog,
    projectForm,
    projectFormSubmitButton,
    projectTitleInput,
  } = getDOMElements();

  const config = {
    add: {
      reset: true,
      headerText: "New project",
      buttonText: "Add",
      buttonValue: "confirm",
    },
    edit: {
      reset: false,
      headerText: "Edit project",
      buttonText: "Update",
      buttonValue: "update",
    }
  };

  const { reset, headerText, buttonText, buttonValue } = config[mode];

  if (reset) {
    projectForm.reset();
  }

  if (project) {
    currentProjectEdit = project;
    projectTitleInput.value = project.title;
  }

  projectHeader.textContent = headerText;
  projectFormSubmitButton.textContent = buttonText;
  projectFormSubmitButton.value = buttonValue;
  projectDialog.showModal();
}

export function getCurrentProjectEdit() {
  return currentProjectEdit;
}