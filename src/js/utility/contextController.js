let currentProject;
let currentTodo;

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