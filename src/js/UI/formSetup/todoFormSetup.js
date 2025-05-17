import getDOMElements from "./../../utility/dom.js";

export default function setupTodoDialogForm({ mode, todo }) {
  const {
    todoForm,
    todoSubmitButton,
    titleInput,
    descriptionInput,
    dueInput,
    priorityInput
  } = getDOMElements();

  if (mode === "add") {
    todoForm.reset();
    todoForm.removeAttribute("data-todo-id");

    todoSubmitButton.textContent =  "Add";
    todoSubmitButton.value = "confirm";
  }

  if (mode === "edit") {
    todoForm.setAttribute("data-todo-id", todo.id);

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
    priorityInput.value = todo.priority;

    todoSubmitButton.textContent =  "Update";
    todoSubmitButton.value = "update";
  }
}