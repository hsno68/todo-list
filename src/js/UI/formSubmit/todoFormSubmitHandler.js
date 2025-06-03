import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import setupTodoDialogForm from "./../formSetup/setupTodoDialogForm.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, projectForm, todoForm } = getDOMElements();

  const projectId = projectForm.dataset.projectId;
  const project = projectManager.get(projectId);

  if (!project) {
    console.log('Project not found');
    todoDialog.close();
    return;
  }

  if (submitType === "confirm") {
    const todo = new TodoMaker(todoFormObject)
    todoForm.setAttribute("data-todo-id", todo.id);
    project.add(todo);
    project.renderTodos();
    todoForm.reset();
    todoDialog.close();
  }

  if (submitType === "update") {
    const todoId = todoForm.dataset.todoId;
    const todo = project.get(todoId);
    todo.update(todoFormObject);
    project.edit(todo);
    project.renderTodos();
    todoForm.reset();
    todoDialog.close();
  }

  if (submitType === "edit") {
    const todoId = todoForm.dataset.todoId;
    const todo = project.get(todoId);
    setupTodoDialogForm({ mode: "edit", todo: todo});
  }
}