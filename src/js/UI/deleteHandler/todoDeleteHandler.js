import projectManager from "./../../app/projectManager.js";
import { renderTodosBasedOnContext, persistAppState } from "./../../utility/utility.js";

export default function todoDeleteHandler(todo) {
  const projectId = todo.projectId;
  const project = projectManager.get(projectId);
  project.delete(todo);
  persistAppState();
  renderTodosBasedOnContext();
}