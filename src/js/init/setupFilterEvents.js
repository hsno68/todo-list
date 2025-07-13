import { setCurrentProjectContext, setCurrentFilterContext } from "./../utility/contextController.js";
import { toggleSelectedTab, persistAppState, renderTodosBasedOnContext, closeSidebarMenu } from "./../utility/utility.js";

export default function setupFilterEvents({ button, filter}) {
  button.addEventListener("click", () => {
    toggleSelectedTab(button);
    setCurrentProjectContext(null);
    setCurrentFilterContext(filter);
    persistAppState();
    renderTodosBasedOnContext();
    closeSidebarMenu();
  });
}