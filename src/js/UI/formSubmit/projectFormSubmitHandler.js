import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";
import { getCurrentProjectContext, setCurrentProjectContext, setCurrentFilterContext } from "./../../utility/contextController.js";
import { renderTodosBasedOnContext, persistAppState, toggleSelectedTab } from "./../../utility/utility.js";

export default function projectFormSubmitHandler({ projectFormObject, mode, currentProjectEdit }) {
  let project;

  const isCreating = mode === "add";
  const isEditing = mode === "edit";

  if (isCreating) {
    project = new ProjectMaker({...projectFormObject, isSelected: true });
    projectManager.add(project);
    toggleSelectedTab(project.element);
    setCurrentFilterContext(null);
    setCurrentProjectContext(project);
  }

  if (isEditing) {
    const isCurrentlySelected = currentProjectEdit === getCurrentProjectContext();
    project = currentProjectEdit;
    project.update({...projectFormObject, isSelected: isCurrentlySelected });
    projectManager.update(project);
  }

  persistAppState();
  projectManager.renderProjects();
  renderTodosBasedOnContext();
}