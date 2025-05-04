import "./../css/styles.css";
import generateId from "./idGenerator.js";
import TodoMaker from "./todoMaker.js";
import addTodoItem from "./todoAdder.js";
import ProjectMaker from "./projectMaker.js";
import addProject from "./projectAdder.js";

const addProjectButton = document.querySelector("button.addProject");
const addTodoButton = document.querySelector("button.addTodo");
if (addProjectButton) {
  addProjectButton.addEventListener("click", updateProjectCollection);
}
if (addTodoButton) {
  addTodoButton.addEventListener("click", updateTodoCollection);
}

const projectsCollection = {
  allProjectIds: []
};

let projectId;

function updateProjectCollection() {
  projectId = generateId();
  //Regenerate a new project Id if project Id already exists
  while (projectsCollection.hasOwnProperty(projectId)) {
    projectId = generateId();
  }
  const project = new ProjectMaker(projectId, prompt("Name of Project?"));
  addProject(projectId, projectsCollection, projectsCollection.allProjectIds, project);
  console.log({projectsCollection});
}

function updateTodoCollection() {
  let todoId = generateId();
  const project = projectsCollection[projectId];
  //Regenerate a new todo Id if todo Id already exists
  while (project.todosByIds.hasOwnProperty(todoId)) {
    todoId = generateId();
  }
  const todoItem = new TodoMaker(
    todoId,
    prompt("Name of todo"),
    prompt("Description"),
    prompt("Due"),
    prompt("Priority"),
  );
  addTodoItem(todoId, project.todosByIds, project.allTodoIds, todoItem)
  console.log({projectsCollection});
}