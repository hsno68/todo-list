import { resetCurrentProject, resetCurrentTodo, setCurrentFilterContext } from "./../utility/contextController";
import projectManager from "./../app/projectManager";

export default function setupFilterEvents({ button, filter}) {
  button.addEventListener("click", () => {
    resetCurrentProject();
    resetCurrentTodo();
    setCurrentFilterContext(filter);
    projectManager.renderFilteredTodos(filter);
  });
}