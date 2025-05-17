import getDOMElements from "./../../utility/dom";
import { defaultProject } from "./../../app/projectMaker.js";
import TodoMaker from "./../../app/todoMaker.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoForm } = getDOMElements();

  if (submitType === "confirm") {
    const todo = new TodoMaker(todoFormObject)

    defaultProject.add(todo);
    defaultProject.renderTodos();

    todoForm.reset();
  }
  
  if (submitType === "update") {
    const todoId = todoForm.dataset.todoId;
    const todo = defaultProject.get(todoId);

    todo.update(todoFormObject);
    defaultProject.edit(todo);
    defaultProject.renderTodos();

    todoForm.reset();
  }
}