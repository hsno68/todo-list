let currentProjectContext = null;
let currentFilterContext = null;

export function getCurrentProjectContext() {
  return currentProjectContext;
}

export function setCurrentProjectContext(project) {
  currentProjectContext = project;
}

export function getCurrentFilterContext() {
  return currentFilterContext;
}

export function setCurrentFilterContext(filter) {
  currentFilterContext = filter;
}