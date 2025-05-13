import projectsCollection from "./../app/projectManager.js";
import { defaultProject } from "./../app/projectMaker.js";

export default function setupProjects() {
  projectsCollection.addProject(defaultProject);
}