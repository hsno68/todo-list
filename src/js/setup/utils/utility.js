import getDOMElements from "./dom.js";
import { defaultProject, addTodo, editTodo, renderTodos } from "./../../app/projectMaker.js";
import TodoMaker, { updateTodo } from "./../../app/todoMaker.js";

const elements = getDOMElements();

export function generateId() {
  let timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}

export function setupDialogForm({ mode, todo }) {
  const { todoForm, todoSubmitButton, titleInput, descriptionInput, dueInput, priorityInput } = elements;

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

export function formSubmitHandler(todoFormObject, submitType) {
  const { todoForm } = elements;

  if (submitType === "confirm") {
    const todo = new TodoMaker(todoFormObject)

    addTodo(defaultProject, todo);
    renderTodos(defaultProject);

    todoForm.reset();
  }
  
  if (submitType === "update") {
    const todoId = todoForm.dataset.todoId;
    const todo = defaultProject.getTodo(todoId);

    updateTodo(todo, todoFormObject);
    editTodo(defaultProject, todo);
    renderTodos(defaultProject);

    todoForm.reset();
  }
}