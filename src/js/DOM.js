const addProjectButton = document.querySelector("button.addProject");
const addTodoButton = document.querySelector("button.addTodo");
const projects = document.querySelector("div#projects");
const todos = document.querySelector("div#todos");

export function renderProjects(project) {
  projects.appendChild(project);
}

export function renderTodos(todo) {
  todos.appendChild(todo);
}