import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectDialog, projectForm } = getDOMElements();

  let project;

  if (submitType === "confirm") {
    project = new ProjectMaker(projectFormObject);
    projectForm.setAttribute("data-project-id", project.id);
    projectManager.add(project)
  }

  if (submitType === "update") {
    const projectId = projectForm.dataset.projectId;
    project = projectManager.get(projectId);
    project.update(projectFormObject);
    projectManager.edit(project);
  }

  projectManager.renderProjects();
  project.renderTodos();
  projectForm.reset();
  projectDialog.close();
}