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

  const filter = getCurrentFilterContext();
  const activeProject = getCurrentProject();

  if (filter === null && activeProject !== null) {
    project.renderTodos();
  }
  else if (filter !== null) {
    projectManager.renderFilteredTodos(filter);
    resetCurrentProject();
  }

  todoForm.reset();
  todoDialog.close();
}