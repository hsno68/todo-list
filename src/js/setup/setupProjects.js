import projectManager from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProjects() {
  projectManager.add(defaultProject);
}