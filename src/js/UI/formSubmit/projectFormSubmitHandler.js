import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";
import { getCurrentProjectEdit } from "./../formSetup/setupProjectDialogForm.js";
import { setCurrentProjectContext, setCurrentFilterContext } from "./../../utility/contextController.js";
import { renderTodosBasedOnContext } from "./../../utility/utility.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectDialog, projectForm } = getDOMElements();

  let project;

  const isCreating = submitType === "confirm";
  const isEditing = submitType === "update";

  if (isCreating) {
    project = new ProjectMaker(projectFormObject);
    projectManager.add(project);
    setCurrentFilterContext(null);
    setCurrentProjectContext(project);
  }
  
  if (isEditing) {
    project = getCurrentProjectEdit();
    project.update(projectFormObject);
    projectManager.update(project);
  }

  projectManager.renderProjects();
  renderTodosBasedOnContext(project);
  projectForm.reset();
  projectDialog.close();
}