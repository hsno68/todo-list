import projectManager from "./../../app/projectManager.js";

export default function todoDeleteHandler(todo) {
  const project = projectManager.currentProject;

  project.delete(todo);
  project.renderTodos();
}