export default function getDOMElements() {
  const elements = {};
  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }
  return elements;
}

const selectors = {
  dialog: "dialog",
  form: "form",
  addProjectButton: "button.add-project",
  addTodoButton: "button.add-todo",
  cancelButton: "button.cancel",
  confirmButton: "button.confirm",
  projectsContainer: "div.projects",
  todosContainer: "div.todos",
  titleInput: "input#title",
  descriptionInput: "input#description",
  dueInput: "input#due",
  priorityInput: "input#priority",
};