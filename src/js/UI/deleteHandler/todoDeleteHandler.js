import projectManager from "./../../app/projectManager.js";
import { getCurrentFilterContext } from "../../utility/contextController.js";

export default function todoDeleteHandler(todo) {
  const projectId = todo.projectId;
  const project = projectManager.get(projectId);
  project.delete(todo);
  const filter = getCurrentFilterContext();
  if (filter !== null) {
    projectManager.renderFilteredTodos(filter);
  }
  else {
    project.renderTodos();
  }
}