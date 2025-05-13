import getDOMElements from "./../utility/dom.js";
import { defaultProject } from "./../app/projectMaker.js";
import TodoMaker from "./../app/todoMaker.js";

export function formSubmitHandler(formObject) {
  const { todosContainer } = getDOMElements();
  const todoItem = new TodoMaker(formObject);
  defaultProject.addTodo(todoItem);
  todosContainer.appendChild(todoItem.element);
}