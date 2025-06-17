import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";
import { setCurrentProject, getCurrentProject, resetCurrentProject, getCurrentFilterContext, resetCurrentFilterContext } from "./../../utility/contextController.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectDialog, projectForm } = getDOMElements();

  let project;

  if (submitType === "confirm") {
    resetCurrentFilterContext();
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

  const filter = getCurrentFilterContext();
  const activeProject = getCurrentProject();

  if (filter === null && activeProject !== null) {
    project.renderTodos();
  }
  else if (filter !== null) {
    projectManager.renderFilteredTodos(filter);
    resetCurrentProject();
  }

  projectForm.reset();
  projectDialog.close();
}