import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";

export default function setupTodoDialogForm({ mode, todo }) {
  const {
    todoDialog,
    todoForm,
    todoFormSubmitButton,
    titleInput,
    descriptionInput,
    selectInput,
    hiddenSelectInput,
    dueInput,
  } = getDOMElements();

  const config = {
    add: {
      reset: true,
      buttonText: "Add",
      buttonValue: "confirm"
    },
    edit: {
      reset: false,
      buttonText: "Update",
      buttonValue: "update"
    },
  };

  const { reset, buttonText, buttonValue } = config[mode];

  const project = projectManager.currentProject;

  // Resets form fields when adding new todos
  if (reset) {
    todoForm.reset();
  }

  // Creating or editing todos within the context of a project and not global state
  if (project) {
    // Visually preselects the correct project in the <select> dropdown
    selectInput.value = project.id;

    // Prevents the user from interacting with the <select> dropdown
    selectInput.classList.add("locked");
  }
  else {
    selectInput.classList.remove("locked");
  }

  // For editing todos
  // A todo object is only passed in as function argument during edit mode (see TodoMaker)
  if (todo) {
    // Prepopulates form fields with existing todo data
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
  }

  todoFormSubmitButton.textContent = buttonText;
  todoFormSubmitButton.value = buttonValue;

  todoDialog.showModal();
  setTimeout(() => titleInput.focus(), 0);
}