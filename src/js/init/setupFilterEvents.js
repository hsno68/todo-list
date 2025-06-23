import { setCurrentProjectContext, setCurrentFilterContext } from "./../utility/contextController.js";
import { persistAppState, renderTodosBasedOnContext } from "./../utility/utility.js";

export default function setupFilterEvents({ button, filter}) {
  button.addEventListener("click", () => {
    setCurrentProjectContext(null);
    setCurrentFilterContext(filter);
    persistAppState();
    renderTodosBasedOnContext();
  });
}