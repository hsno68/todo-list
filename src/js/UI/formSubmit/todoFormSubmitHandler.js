import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import { getCurrentTodoEdit } from "./../formSetup/setupTodoDialogForm.js";
import { getTodoDataFromFilterContext, renderTodosBasedOnContext, persistAppState } from "./../../utility/utility.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);
  const projectTitle = project.title;

  let todo;

  const isCreating = submitType === "add";
  const isEditing = submitType === "edit";

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

  persistAppState();
  renderTodosBasedOnContext();
  todoForm.reset();
  todoDialog.close();
}