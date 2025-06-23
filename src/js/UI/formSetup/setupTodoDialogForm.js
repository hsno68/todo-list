import getDOMElements from "./../../utility/dom.js";
import { resetFilteredDueInputs } from "./../../utility/utility.js";
import { getCurrentFilterContext, getCurrentProjectContext } from "./../../utility/contextController.js";

let currentTodoEdit;

export default function setupTodoDialogForm({ mode, todo, project }) {
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
      buttonValue: "add"
    },
    edit: {
      reset: false,
      buttonText: "Update",
      buttonValue: "edit"
    },
  };

  const { reset, buttonText, buttonValue } = config[mode];

  if (reset) {
    todoForm.reset();
  }

  const activeProject = project ?? getCurrentProjectContext();

  if (activeProject) {
    selectInput.value = activeProject.id;
    selectInput.classList.add("locked");
  }
  else {
    selectInput.classList.remove("locked");
  }

  const filter = getCurrentFilterContext();
  resetFilteredDueInputs();

  if (filter === "today") {
    const today = new Date().toLocaleDateString("en-CA");
    dueInput.value = today;
    dueInput.min = today;
    dueInput.max = today;
    dueInput.classList.add("locked");
  }
  else if (filter === "week") {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const formatDate = (date) => date.toLocaleDateString("en-CA");

    dueInput.value = formatDate(today);
    dueInput.min = formatDate(startOfWeek);
    dueInput.max = formatDate(endOfWeek);
  }

  if (todo) {
    currentTodoEdit = todo;
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
  }

  todoFormSubmitButton.textContent = buttonText;
  todoFormSubmitButton.value = buttonValue;

  todoDialog.showModal();
  setTimeout(() => titleInput.focus(), 0);
}

export function getCurrentTodoEdit() {
  return currentTodoEdit;
}