import "./../css/styles.css";
import generateId from "./idGenerator.js";
import ProjectManager from "./projectManager.js";
import TodoMaker from "./todoMaker.js";
import ProjectMaker from "./projectMaker.js";
import {renderProjects, renderTodos} from "./DOM.js";

window.addEventListener("load", () => {
  const ProjectsCollection = new ProjectManager();
  const project = new ProjectMaker("Untitled");
  ProjectsCollection.currentProjectId = generateId();
  ProjectsCollection.addProject(ProjectsCollection.currentProjectId, project);

  const projectElement = project.render();
  renderProjects(projectElement);

  const todo1 = new TodoMaker("Cook", "Make dinner", "5pm", "High");
  const todo2 = new TodoMaker("Homework", "Math", "9pm", "High");
  const todo3 = new TodoMaker("Exercise", "N/A", "N/A", "Low");

  project.addTodoItem("1", todo1);
  project.addTodoItem("2", todo2);
  project.addTodoItem("3", todo3);

  const todo1Element =  todo1.render();
  const todo2Element =  todo2.render();
  const todo3Element =  todo3.render();
  renderTodos(todo1Element);
  renderTodos(todo2Element);
  renderTodos(todo3Element);

  console.log({ProjectsCollection});
});