import "./../css/styles.css";
import ProjectManager from "./projectManager.js";
import ProjectMaker from "./projectMaker.js";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const addProjectButton = document.querySelector("button.add-project");
const addTodoButton = document.querySelector("button.add-todo");
const projectsContainer = document.querySelector("div.projects");

(function intialSetup() {
  const projectsCollection = new ProjectManager();
  const defaultProject = new ProjectMaker("Untitled");
  projectsCollection.addProject(defaultProject.projectId, defaultProject);
  const projectElement = defaultProject.render();
  projectsContainer.appendChild(projectElement);

  addProjectButton.addEventListener("click", () => {
    console.log(projectsCollection)
  });
})();

addTodoButton.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "" || dialog.returnValue === "cancel") {
    return;
  }

  const formData =  new FormData(form);
  const formObject =  Object.fromEntries(formData.entries());
});