import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";

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
    const todo = new TodoMaker({...todoFormObject, projectId});
    todoForm.setAttribute("data-todo-id", todo.id);
    project.add(todo);
  }

  if (submitType === "update") {
    const todoId = todoForm.dataset.todoId;
    const todo = project.get(todoId);
    todo.update(todoFormObject);
    project.edit(todo);
  }

  project.renderTodos();
  todoForm.reset();
  todoDialog.close();
}