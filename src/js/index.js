import "./../css/styles.css";
import generateId from "./idGenerator.js";
import ProjectManager from "./projectManager.js";
import TodoMaker from "./todoMaker.js";
import ProjectMaker from "./projectMaker.js";

const addProjectButton = document.querySelector("button.addProject");
const addTodoButton = document.querySelector("button.addTodo");
const projects = document.querySelector("div#projects");
const todos = document.querySelector("div#todos");

function render(parent, child) {
  parent.appendChild(child);
}

window.addEventListener("load", () => {
  const ProjectsCollection = new ProjectManager();
  const project = new ProjectMaker("Untitled");
  ProjectsCollection.currentProjectId = generateId();
  ProjectsCollection.addProject(ProjectsCollection.currentProjectId, project);

  const projectElement = project.render();
  render(projects, projectElement);

  const todo1 = new TodoMaker("Cook", "Make dinner", "5pm", "High");
  const todo2 = new TodoMaker("Homework", "Math", "9pm", "High");
  const todo3 = new TodoMaker("Exercise", "N/A", "N/A", "Low");

  project.addTodoItem("1", todo1);
  project.addTodoItem("2", todo2);
  project.addTodoItem("3", todo3);

  const todo1Element =  todo1.render();
  const todo2Element =  todo2.render();
  const todo3Element =  todo3.render();
  render(todos, todo1Element);
  render(todos, todo2Element);
  render(todos, todo3Element);

  console.log({ProjectsCollection});
});