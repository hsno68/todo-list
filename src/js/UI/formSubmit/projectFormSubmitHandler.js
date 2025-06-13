import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectDialog, projectForm } = getDOMElements();

  let project;

  if (submitType === "confirm") {
    project = new ProjectMaker(projectFormObject);
    projectManager.add(project);
    projectManager.currentProject = project;
  }

  if (submitType === "update") {
    project = projectManager.currentProject;
    project.update(projectFormObject);
    projectManager.edit(project);
  }

  projectManager.renderProjects();
  project.renderTodos();
  projectForm.reset();
  projectDialog.close();
}