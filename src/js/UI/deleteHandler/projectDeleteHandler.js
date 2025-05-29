import projectManager from "./../../app/projectManager.js";

export default function projectDeleteHandler(project) {
  projectManager.delete(project);
  projectManager.render();
  todosContainer.replaceChildren();
}