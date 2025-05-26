import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { projectForm, todoForm } = getDOMElements();

  if (submitType === "confirm") {
    const todo = new TodoMaker(todoFormObject)
    const projectId = projectForm.dataset.projectId;
    const project = projectManager.get(projectId);

    todoForm.setAttribute("data-todo-id", todo.id);

    project.add(todo);
    project.renderTodos();

    todoForm.reset();
  }

  if (submitType === "update") {
    const projectId = projectForm.dataset.projectId;
    const project = projectManager.get(projectId);

    const todoId = todoForm.dataset.todoId;
    const todo = project.get(todoId);

    todo.update(todoFormObject);
    project.edit(todo);
    project.renderTodos();

    todoForm.reset();
  }
}