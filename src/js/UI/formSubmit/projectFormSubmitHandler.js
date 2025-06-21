import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";
import { setCurrentProjectContext, setCurrentFilterContext } from "./../../utility/contextController.js";
import { renderTodosBasedOnContext } from "./../../utility/utility.js";

export default function projectFormSubmitHandler({ projectFormObject, mode, currentProjectEdit }) {
  let project;

  const isCreating = mode === "add";
  const isEditing = mode === "edit";

  if (isCreating) {
    project = new ProjectMaker(projectFormObject);
    projectManager.add(project);
    setCurrentFilterContext(null);
    setCurrentProjectContext(project);
  }
  
  if (isEditing) {
    project = currentProjectEdit;
    project.update(projectFormObject);
    projectManager.update(project);
  }

  projectManager.renderProjects();
  renderTodosBasedOnContext(project);
}