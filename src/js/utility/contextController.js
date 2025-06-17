let currentFilterContext = null;
let currentProject = null;
let currentTodo = null;

export function getCurrentProject() {
  return currentProject;
}

export function setCurrentProject(project) {
  currentProject = project;
}

export function resetCurrentProject() {
  currentProject = null;
}

export function getCurrentTodo() {
  return currentTodo;
}

export function setCurrentTodo(todo) {
  currentTodo = todo;
}

export function resetCurrentTodo() {
  currentTodo = null;
}

export function getCurrentFilterContext() {
  return currentFilterContext;
}

export function setCurrentFilterContext(filter) {
  currentFilterContext = filter;
}

export function resetCurrentFilterContext() {
  currentFilterContext = null;
}