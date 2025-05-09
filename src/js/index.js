import "./../css/styles.css";
import generateId from "./idGenerator.js";
import ProjectManager from "./projectManager.js";
import TodoMaker from "./todoMaker.js";
import ProjectMaker from "./projectMaker.js";

const addProjectButton = document.querySelector("button.addProject");
const addTodoButton = document.querySelector("button.addTodo");
const projectsDiv = document.querySelector("div#projects");
const todosDiv = document.querySelector("div#todos");
const dialog = document.querySelector("dialog");

const ProjectsCollection = new ProjectManager();
const defaultProject = new ProjectMaker("Untitled");
ProjectsCollection.currentProjectId = generateId();
ProjectsCollection.addProject(ProjectsCollection.currentProjectId, defaultProject);
const projectElement = defaultProject.render();
projectsDiv.appendChild(projectElement);

// addTodoButton.addEventListener("click", () => {
//   const todoItem = new TodoMaker(
//     prompt("Title"),
//     prompt("Description"),
//     prompt("Due"),
//     prompt("Priority")
//   );
//   const todoId = generateId();
//   project.addTodoItem(todoId, todoItem);
//   const todoElement = todoItem.render();
//   todosDiv.appendChild(todoElement);
// });

addTodoButton.addEventListener("click", () => {
  dialog.showModal();
});