import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import { getCurrentTodoEdit } from "./../formSetup/setupTodoDialogForm.js";
import { getCurrentProject, resetCurrentProject } from "./../../utility/contextController.js";
import { getTodoDataFromFilterContext, renderTodosBasedOnContext } from "./../../utility/utility.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);
  const projectTitle = project.title;

  let todo;

  const isCreating = submitType === "confirm";
  const isEditing = submitType === "update";

  if (isCreating) {
    const { important, completed } = getTodoDataFromFilterContext();
    todo = new TodoMaker({ ...todoFormObject, important, completed, projectId, projectTitle });
    project.add(todo);
  }

  if (isEditing) {
    todo = getCurrentTodoEdit();
    todo.update({ ...todoFormObject, projectId, projectTitle });
    project.edit(todo);
  }

  renderTodosBasedOnContext(project);
  todoForm.reset();
  todoDialog.close();
}