import "./../css/styles.css";
import generateId from "./idGenerator.js";
import TaskMaker from "./taskMaker.js";
import addTaskItem from "./taskAdder.js";
import makeProject from "./projectMaker.js";
import addProject from "./projectAdder.js";

const addProjectButton = document.querySelector("button.addProject");
const addTaskButton = document.querySelector("button.addTask");
if (addProjectButton) {
  addProjectButton.addEventListener("click", updateProjectCollection);
}
if (addTaskButton) {
  addTaskButton.addEventListener("click", updateTaskState);
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
  const newProject = makeProject(prompt("Enter a project title"));
  addProject(projectId, projectsCollection, projectsCollection.allProjectIds, newProject);
  console.log({projectsCollection});
}

function updateTaskState() {
  const taskItem = new TaskMaker(
    prompt("Name of Task"),
    prompt("Description"),
    prompt("Due"),
    prompt("Priority"),
  );
  addTaskItem(projectsCollection[projectId].tasksByIds, projectsCollection[projectId].allTaskIds, taskItem)
  console.log({projectsCollection});
}