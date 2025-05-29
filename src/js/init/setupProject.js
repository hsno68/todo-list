import getDOMElements from "./../utility/dom.js";
import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProject() {
  const { projectForm } = getDOMElements();
  projectManager.add(defaultProject);
  projectManager.render();
  projectForm.setAttribute("data-project-id", defaultProject.id);
}