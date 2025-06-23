import projectManager from "./../../app/projectManager.js";
import { persistAppState, renderTodosBasedOnContext } from "./../../utility/utility.js";
import { setCurrentFilterContext, setCurrentProjectContext } from "./../../utility/contextController.js";

export default function projectDeleteHandler(project) {
  projectManager.delete(project);
  setCurrentFilterContext("inbox");
  setCurrentProjectContext(null);
  persistAppState();
  projectManager.renderProjects();
  renderTodosBasedOnContext();
}