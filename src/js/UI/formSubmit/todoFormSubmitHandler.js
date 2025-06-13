import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);
  const projectTitle = project.title;

  if (submitType === "confirm") {
    const todo = new TodoMaker({ ...todoFormObject, projectTitle });
    project.add(todo);
  }

  if (submitType === "update") {
    const todo = projectManager.currentTodo;
    todo.update({ ...todoFormObject, projectTitle });
    project.edit(todo);
  }

  project.renderTodos();
  todoForm.reset();
  todoDialog.close();
}