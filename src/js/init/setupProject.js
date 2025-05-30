import getDOMElements from "./../utility/dom.js";
import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProject() {
  const { projectsContainer, projectForm } = getDOMElements();
  projectManager.add(defaultProject);
  projectsContainer.appendChild(defaultProject.element);
  projectForm.setAttribute("data-project-id", defaultProject.id);
}