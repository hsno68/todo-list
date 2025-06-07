import projectManager from "./../app/projectManager";

export default function setupFilterEvents({ button, filter }) {
  button.addEventListener("click", () => {
    projectManager.renderTodos(filter);
  });
}