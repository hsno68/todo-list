import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProject() {
  projectManager.add(defaultProject);
  projectManager.renderProjects();
}