import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";
import ProjectMaker from "./../../app/projectMaker.js";

export default function projectFormSubmitHandler(projectFormObject, submitType) {
  const { projectForm } = getDOMElements();

  if (submitType === "confirm") {
    const project = new ProjectMaker(projectFormObject);
    projectManager.add(project);
    projectManager.render();
    projectForm.reset();
  }

  if (submitType === "update") {
    const projectId = projectForm.dataset.projectId;
    const project = projectManager.get(projectId);

    project.update(projectFormObject);
    projectManager.edit(project);
    projectManager.render();

    projectForm.reset();
  }
}