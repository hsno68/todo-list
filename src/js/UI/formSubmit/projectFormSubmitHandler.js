import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";
import { setCurrentProject, getCurrentProject } from "./../../utility/contextController.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectDialog, projectForm } = getDOMElements();

  let project;

  if (submitType === "confirm") {
    project = new ProjectMaker(projectFormObject);
    projectManager.add(project);
    setCurrentProject(project);
  }

  if (submitType === "update") {
    project = getCurrentProject();
    project.update(projectFormObject);
    projectManager.update(project);
  }

  projectManager.renderProjects();
  project.renderTodos();
  projectForm.reset();
  projectDialog.close();
}