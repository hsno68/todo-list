import projectManager from "./../../app/projectManager.js";
import { resetCurrentFilterContext, resetCurrentProject } from "./../../utility/contextController.js";

export default function projectDeleteHandler(project) {
  projectManager.delete(project);
  projectManager.renderProjects();
  projectManager.renderFilteredTodos("inbox");
  resetCurrentFilterContext();
  resetCurrentProject();
}