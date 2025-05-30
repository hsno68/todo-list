import getDOMElements from "./../../utility/dom.js";

export default function setupTodoDialogForm({ mode, todo }) {
  const {
    todoDialog,
    todoForm,
    todoFormSubmitButton,
    titleInput,
    descriptionInput,
    dueInput,
    priorityInput
  } = getDOMElements();

  if (mode === "add") {
    todoForm.reset();

    todoFormSubmitButton.textContent = "Add";
    todoFormSubmitButton.value = "confirm";
  }

  if (mode === "edit") {
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
    priorityInput.value = todo.priority;

    todoFormSubmitButton.textContent = "Update";
    todoFormSubmitButton.value = "update";
  }

  todoDialog.showModal();
}