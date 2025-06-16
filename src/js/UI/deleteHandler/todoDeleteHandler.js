import { getCurrentProject } from "../../utility/contextController.js";

export default function todoDeleteHandler(todo) {
  const project = getCurrentProject();
  project.delete(todo);
  project.renderTodos();
}