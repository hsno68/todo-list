import getDOMElements from "../utility/dom";
import projectManager from "./../app/projectManager";

export default function setupFilterEvents({ button, filter, labelText }) {
  const { label } = getDOMElements();

  button.addEventListener("click", () => {
    projectManager.renderTodos(filter);
    label.textContent = labelText;
  });
}