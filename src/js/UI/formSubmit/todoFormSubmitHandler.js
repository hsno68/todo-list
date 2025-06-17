import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import { getCurrentTodo, getCurrentProject, resetCurrentProject, getCurrentFilterContext } from "./../../utility/contextController.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);
  const projectTitle = project.title;

  const filter = getCurrentFilterContext();

  let todo;

  if (submitType === "confirm") {
    const important = filter === "important";
    const completed = filter === "completed";
    todo = new TodoMaker({ ...todoFormObject, important, completed, projectId, projectTitle });
    project.add(todo);
  }
  else if (submitType === "update") {
    todo = getCurrentTodo();
    todo.update({ ...todoFormObject, projectId, projectTitle });
    project.edit(todo);
  }

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