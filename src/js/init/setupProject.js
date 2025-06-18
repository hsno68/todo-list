import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";
import { setCurrentFilterContext } from "./../utility/contextController.js";

export default function setupProject() {
  projectManager.add(defaultProject);
  projectManager.renderProjects();
  setCurrentFilterContext("inbox");
  projectManager.renderFilteredTodos("inbox");
}