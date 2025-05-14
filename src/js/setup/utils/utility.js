import getDOMElements from "./dom.js";
import { defaultProject, addTodo, editTodo, renderTodos } from "./../../app/projectMaker.js";
import TodoMaker, { updateTodo } from "./../../app/todoMaker.js";

const elements = getDOMElements();

export function generateId() {
  let timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}

export function setupDialogForm({ mode, todo }) {
  const { form, submitButton, titleInput, descriptionInput, dueInput, priorityInput } = elements;

  if (mode === "add") {
    form.reset();
    form.removeAttribute("data-todo-id");

    submitButton.textContent =  "Add";
    submitButton.value = "confirm";
  }

  if (mode === "edit") {
    form.setAttribute("data-todo-id", todo.id);

    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueInput.value = todo.due;
    priorityInput.value = todo.priority;

    submitButton.textContent =  "Update";
    submitButton.value = "update";
  }
}

export function formSubmitHandler(formObject, submitType) {
  const { form } = elements;

  if (submitType === "confirm") {
    const todo = new TodoMaker(formObject)

    addTodo(defaultProject, todo);
    renderTodos(defaultProject);

    form.reset();
  }
  
  if (submitType === "update") {
    const todoId = form.dataset.todoId;
    const todo = defaultProject.get(todoId);

    updateTodo(todo, formObject);
    editTodo(defaultProject, todo);
    renderTodos(defaultProject);

    form.reset();
  }
}