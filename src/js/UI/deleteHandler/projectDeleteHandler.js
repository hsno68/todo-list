import getDOMElements from "./../../utility/dom.js";
import projectManager from "./../../app/projectManager.js";

export default function projectDeleteHandler(project) {
  const { todosContainer } = getDOMElements();
  projectManager.delete(project);
  projectManager.render();
  todosContainer.replaceChildren();
}