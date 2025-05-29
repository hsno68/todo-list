import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";

export default function todoDeleteHandler(todo) {
  const { projectForm } = getDOMElements();

  const projectId = projectForm.dataset.projectId;
  const project = projectManager.get(projectId);

  project.delete(todo);
  project.renderTodos();
}