import "./../css/styles.css";
import generateId from "./idGenerator.js";
import TaskMaker from "./taskMaker.js";
import addTaskItem from "./taskAdder.js";
import ProjectMaker from "./projectMaker.js";
import addProject from "./projectAdder.js";

const addProjectButton = document.querySelector("button.addProject");
const addTaskButton = document.querySelector("button.addTask");
if (addProjectButton) {
  addProjectButton.addEventListener("click", updateProjectCollection);
}
if (addTaskButton) {
  addTaskButton.addEventListener("click", updateTaskCollection);
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

function updateTaskCollection() {
  let taskId = generateId();
  const project = projectsCollection[projectId];
  //Regenerate a new task Id if task Id already exists
  while (project.tasksByIds.hasOwnProperty(taskId)) {
    taskId = generateId();
  }
  const taskItem = new TaskMaker(
    taskId,
    prompt("Name of Task"),
    prompt("Description"),
    prompt("Due"),
    prompt("Priority"),
  );
  addTaskItem(taskId, project.tasksByIds, project.allTaskIds, taskItem)
  console.log({projectsCollection});
}