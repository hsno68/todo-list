import getDOMElements from "./../utility/dom.js";
import { defaultProject } from "./../app/projectMaker.js";
                               
export default function setupUI() {
  const { projectsContainer } = getDOMElements();
  projectsContainer.appendChild(defaultProject.element);
}