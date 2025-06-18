import { setCurrentProjectContext, setCurrentFilterContext } from "./../utility/contextController.js";
import projectManager from "./../app/projectManager.js";

export default function setupFilterEvents({ button, filter}) {
  button.addEventListener("click", () => {
    setCurrentProjectContext(null);
    setCurrentFilterContext(filter);
    projectManager.renderFilteredTodos(filter);
  });
}