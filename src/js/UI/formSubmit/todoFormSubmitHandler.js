import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import { getCurrentTodo, getCurrentProject, resetCurrentProject, getCurrentFilterContext } from "./../../utility/contextController.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);
  const projectTitle = project.title;

  if (submitType === "confirm") {
    const todo = new TodoMaker({ ...todoFormObject, projectId, projectTitle });
    project.add(todo);
  }

  if (submitType === "update") {
    const todo = getCurrentTodo();
    todo.update({ ...todoFormObject, projectId, projectTitle });
    project.edit(todo);
  }

  if (getCurrentFilterContext() === null && getCurrentProject !== null) {
    project.renderTodos();
  }
  else if (getCurrentFilterContext !== null) {
    const filter = getCurrentFilterContext();
    projectManager.renderFilteredTodos(filter);
    resetCurrentProject();
  }

  todoForm.reset();
  todoDialog.close();
}