import "./../css/styles.css";
import ProjectManager from "./projectManager.js";
import ProjectMaker from "./projectMaker.js";
import TodoMaker from "./todoMaker.js";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const addProjectButton = document.querySelector("button.add-project");
const addTodoButton = document.querySelector("button.add-todo");
const projectsContainer = document.querySelector("div.projects");
const todosContainer = document.querySelector("div.todos");

const initalSetup = (function() {
  const projectsCollection = new ProjectManager();
  const defaultProject = new ProjectMaker("Untitled");
  projectsCollection.addProject(defaultProject.projectId, defaultProject);
  const projectElement = defaultProject.render();
  projectsContainer.appendChild(projectElement);

  addProjectButton.addEventListener("click", () => {
    console.log(projectsCollection)
  });

  return {
    projectsCollection,
    defaultProject,
  }
})();

addTodoButton.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "" || dialog.returnValue === "cancel") {
    return;
  }

  const defaultProject = initalSetup.defaultProject;

  const formData =  new FormData(form);
  const formObject =  Object.fromEntries(formData.entries());
  const todoItem = new TodoMaker(formObject);

  defaultProject.addTodo(todoItem.todoId, todoItem);
  const todoElement = todoItem.render();
  todosContainer.appendChild(todoElement);
});