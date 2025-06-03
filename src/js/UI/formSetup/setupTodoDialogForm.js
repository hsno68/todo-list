import getDOMElements from "./../../utility/dom.js";

export default function setupTodoDialogForm({ mode, todo }) {
  const {
    todoDialog,
    todoForm,
    todoFormSubmitButton,
    titleInput,
    descriptionInput,
    dueInput
  } = getDOMElements();

  const config = {
    add: {
      reset: true,
      readOnly: false,
      buttonText: "Add",
      buttonValue: "confirm"
    },
    edit: {
      reset: false,
      readOnly: false,
      buttonText: "Update",
      buttonValue: "update"
    },
  };

  const { reset, readOnly, buttonText, buttonValue } = config[mode];

  if (reset) {
    todoForm.reset();
  }

  if (todo) {
    todoForm.setAttribute("data-todo-id", todo.id);
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
  }

  titleInput.readOnly = readOnly;
  descriptionInput.readOnly = readOnly;
  dueInput.readOnly = readOnly;

  todoFormSubmitButton.textContent = buttonText;
  todoFormSubmitButton.value = buttonValue;

  todoDialog.showModal();
  setTimeout(() => titleInput.focus(), 0);
}