import "./../css/styles.css";
import generateId from "./idGenerator.js";
import TaskMaker from "./taskMaker.js";
import addTaskItem from "./taskAdder.js";
import makeProject from "./projectMaker.js";
import addProject from "./projectAdder.js";

const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", updateState);
}

const projectsCollection = {
  allProjectIds: []
};

function updateState() {
  let projectId = generateId();
  //Regenerate a new project Id if project Id already exists
  while (projectsCollection.hasOwnProperty(projectId)) {
    projectId = generateId();
  }
  const newProject = makeProject(prompt("Enter a project title"));
  addProject(projectId, projectsCollection, projectsCollection.allProjectIds, newProject);

  const taskItem = new TaskMaker(
    prompt("Name of Task"),
    prompt("Description"),
    prompt("Due"),
    prompt("Priority"),
    prompt("Notes"),
    prompt("Status")
  );

  addTaskItem(projectsCollection[projectId].tasksByIds, projectsCollection[projectId].allTaskIds, taskItem)
  console.log({projectsCollection});
}