import getDOMElements from "./../utility/dom.js";
import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProject() {
  projectManager.add(defaultProject);

  const { projectsContainer } = getDOMElements();
  projectsContainer.appendChild(defaultProject.element);
  defaultProject.element.setAttribute("data-project-id", defaultProject.id);
}