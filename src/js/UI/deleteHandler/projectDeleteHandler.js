import projectManager from "./../../app/projectManager.js";
import { setCurrentFilterContext, setCurrentProjectContext } from "./../../utility/contextController.js";

export default function projectDeleteHandler(project) {
  projectManager.delete(project);
  projectManager.renderProjects();
  setCurrentFilterContext("inbox");
  projectManager.renderFilteredTodos("inbox");
  setCurrentProjectContext(null);
}