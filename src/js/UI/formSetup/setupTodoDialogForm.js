import getDOMElements from "./../../utility/dom.js";
import { getCurrentProject } from "../../utility/contextController.js";

export default function setupTodoDialogForm({ mode, todo }) {
  const {
    todoDialog,
    todoForm,
    todoFormSubmitButton,
    titleInput,
    descriptionInput,
    selectInput,
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

  if (reset) {
    todoForm.reset();
  }

  const project = getCurrentProject();

  if (project) {
    selectInput.value = project.id;
    selectInput.classList.add("locked");
  }
  else {
    selectInput.classList.remove("locked");
  }

  if (todo) {
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
  }

  todoFormSubmitButton.textContent = buttonText;
  todoFormSubmitButton.value = buttonValue;

  todoDialog.showModal();
  setTimeout(() => titleInput.focus(), 0);
}