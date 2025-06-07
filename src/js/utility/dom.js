export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  projectTitle: "h2.project-title",
  projectDialog: "dialog#project-dialog",
  projectForm: "form#project-form",
  todoDialog: "dialog#todo-dialog",
  todoForm: "form#todo-form",
  addProjectButton: "button.add-project",
  addTodoButton: "button.add-todo",
  projectFormCancelButton: "button.project-cancel",
  projectFormSubmitButton: "button.project-submit",
  todoFormCancelButton: "button.todo-cancel",
  todoFormSubmitButton: "button.todo-submit",
  projectsContainer: "div.projects-container",
  todosContainer: "div.todos-container",
  projectTitleInput: "input#project-title",
  titleInput: "input#title",
  descriptionInput: "textarea#description",
  dueInput: "input#due",
  label: "h2.label",
  inbox: "button#inbox",
  today: "button#today",
  week: "button#week",
  completed: "button#completed",
};