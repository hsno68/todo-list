let currentProject = null;
let currentTodo = null;

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
}

export function getCurrentTodo() {
  return currentTodo;
}

export function setCurrentTodo(todo) {
  currentTodo = todo;
}