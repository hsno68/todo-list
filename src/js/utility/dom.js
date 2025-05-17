export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  projectDialog: "dialog#project-dialog",
  projectForm: "form#project-form",
  todoDialog: "dialog#todo-dialog",
  todoForm: "form#todo-form",
  addProjectButton: "button.add-project",
  addTodoButton: "button.add-todo",
  projectCancelButton: "button.project-cancel",
  projectSubmitButton: "button.project-submit",
  todoCancelButton: "button.todo-cancel",
  todoSubmitButton: "button.todo-submit",
  projectsContainer: "div.projects",
  todosContainer: "div.todos",
  projectTitleInput: "input#project-title",
  titleInput: "input#title",
  descriptionInput: "input#description",
  dueInput: "input#due",
  priorityInput: "input#priority",
};