import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import TodoMaker from "./../../app/todoMaker.js";
import { getCurrentTodo, setCurrentProject } from "./../../utility/contextController.js";

export default function todoFormSubmitHandler(todoFormObject, submitType) {
  const { todoDialog, todoForm } = getDOMElements();

  const projectId = todoFormObject.project
  const project = projectManager.get(projectId);

  if (submitType === "confirm") {
    setCurrentProject(project);
    const projectTitle = project.title;
    const todo = new TodoMaker({ ...todoFormObject, projectTitle });
    project.add(todo);
  }

  if (submitType === "update") {
    const todo = getCurrentTodo();
    todo.update(todoFormObject);
    project.edit(todo);
  }

  project.renderTodos();
  todoForm.reset();
  todoDialog.close();
}