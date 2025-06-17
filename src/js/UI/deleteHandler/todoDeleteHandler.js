import projectManager from "./../../app/projectManager.js";
import { getCurrentFilterContext } from "../../utility/contextController.js";

export default function todoDeleteHandler(todo) {
  const projectId = todo.projectId;
  const project = projectManager.get(projectId);
  project.delete(todo);
  if (getCurrentFilterContext() !== null) {
    const filter = getCurrentFilterContext();
    projectManager.renderFilteredTodos(filter);
  }
  else {
    project.renderTodos();
  }
}