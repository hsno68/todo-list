import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";
import { setCurrentFilterContext } from "./../utility/contextController.js";
import { loadAppState, renderTodosBasedOnContext } from "./../utility/utility.js";

export default function setupProject() {
  if (!localStorage.getItem("appState")) {
    projectManager.add(defaultProject);
    setCurrentFilterContext("inbox");
  } else {
    loadAppState();
  }
  projectManager.renderProjects();
  renderTodosBasedOnContext();
}