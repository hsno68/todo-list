export default function getDOMElements() {
  const elements = {};

  for (const [key, selector] of Object.entries(selectors)) {
    elements[key] = document.querySelector(selector);
  }

  return elements;
}

const selectors = {
  addProjectButton: "button.add-project",
  projectsContainer: "ul.projects-container",
  addTodoButton: "button.add-todo",
  todoDialog: "dialog#todo-dialog",
  todoForm: "form#todo-form",
  todoFormSubmitButton: "button.todo-submit",
  todoFormCancelButton: "button.todo-cancel",
  todoDialogCloseButton: "#todo-dialog button.dialog-close-button",
  todosContainer: "ul.todos-container",
  titleInput: "input#title",
  descriptionInput: "textarea#description",
  selectInput: "select#project",
  dueInput: "input#due",
  header: "h2.header",
  inbox: "button#inbox",
  today: "button#today",
  week: "button#week",
  important: "button#important",
  completed: "button#completed",
  deleteDialog: "dialog#delete-dialog",
  deleteForm: "form#delete-form",
  deleteMessage: "p.delete-msg",
  deleteFormCancelButton: "button.delete-cancel",
  deleteDialogCloseButton: "#delete-dialog button.dialog-close-button",
};