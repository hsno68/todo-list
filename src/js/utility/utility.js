import getDOMElements from "./dom.js";
import projectManager from "./../app/projectManager.js";
import { getCurrentFilterContext, getCurrentProjectContext, setCurrentProjectContext } from "./contextController.js";

export function generateId() {
  const timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}

function dateFormatter(date) {
  if (!date) {
    return "No due date";
  }

  const parsedDate = new Date(date + "T00:00:00");
  return parsedDate.toLocaleDateString("en-US", {
      weekday: "short", // e.g., Mon
      month: "short", // e.g., Jun
      day: "2-digit",   // e.g., 09
      year: "numeric",  // e.g., 2025
    });
}

export function createTodoElement(todo) {
  const li = document.createElement("li");
  li.classList.add("todo");

  if (todo.completed) {
    div.classList.add("completed");
  }

  if (todo.important) {
    div.classList.add("important");
  }

  const checkbox = createCheckbox();
  checkbox.checked = todo.completed;

  const project = document.createElement("div");
  project.classList.add("todo-project");
  project.textContent = todo.projectTitle;

  const container = document.createElement("div");
  container.classList.add("title-container");

  const title = document.createElement("h3");
  title.textContent = todo.title;

  container.appendChild(title);

  const description = document.createElement("p");
  description.classList.add("description", "hidden");
  description.textContent = todo.description;

  if (todo.description) {
    const descriptionButton = createButton({
      iconName: "more_horiz",
      callback: (event) => {
        event.stopPropagation();
        description.classList.toggle("hidden");
      }
    });
    container.appendChild(descriptionButton);
  }

  const dueDate = document.createElement("p");
  dueDate.classList.add("due-date");
  dueDate.textContent = dateFormatter(todo.due);

  li.append(checkbox, project, container, description, dueDate);

  return li;
}

export function createProjectElement(project) {
  const li = document.createElement("li");
  li.classList.add("project");

  const title = document.createElement("p");
  title.textContent = project.title;

  li.appendChild(title);

  return li;
}

export function createButton({ iconName, buttonClass, callback }) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  if (buttonClass) {
    button.classList.add(buttonClass);
  }

  const span = document.createElement("span");
  span.classList.add("material-symbols-rounded");
  span.textContent = iconName;

  button.appendChild(span);
  button.addEventListener("click", callback);

  return button;
}

export function createFormElement({ mode, project }) {
  const form = document.createElement("form");
  form.id = "project-form";
  form.classList.add("project-form");
  form.autocomplete = "off";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "project-title";
  input.name = "title";
  input.placeholder = "Project name";
  input.maxLength = "14";

  const isCreating = mode === "add";
  const isEditing = mode === "edit";

  if (isCreating) {
    input.value = "";
  }

  if (isEditing) {
    input.value = project.title;
  }

  form.appendChild(input);

  setTimeout(() => input.focus(), 0);

  return form;
}

const checkboxAttributes = {
  type: "checkbox",
  name: "completed",
};

function createCheckbox() {
  const checkbox = document.createElement("input");
  for (const [attribute, value] of Object.entries(checkboxAttributes)) {
    checkbox.setAttribute(attribute, value);
  }
  return checkbox;
}

export function toggleCheckbox(todo, checkbox, event) {
  if (event.target !== checkbox) {
    checkbox.checked = !checkbox.checked;
  }
  todo.completed = checkbox.checked;
}

export function toggleImportant(todo) {
  todo.important = !todo.important;
}

export function isDueToday(due) {
  const today = new Date().toLocaleDateString("en-CA");
  return due === today;
}

export function isDueThisWeek(due) {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const dueDate = new Date(due + "T00:00:00");
  return dueDate >= startOfWeek && dueDate <= endOfWeek;
}

export function resetFilteredDueInputs() {
  const { dueInput } = getDOMElements();

  dueInput.value = "";
  dueInput.removeAttribute("min");
  dueInput.removeAttribute("max");
  dueInput.classList.remove("locked");
}

export function getTodoDataFromFilterContext() {
  const filter = getCurrentFilterContext();
  return {
    important: filter === "important",
    completed: filter === "completed",
  };
}

export function renderTodosBasedOnContext(project) {
  const filter = getCurrentFilterContext();
  const activeProject = getCurrentProjectContext();

  if (filter === null && activeProject !== null) {
    project.renderTodos();
  } else if (filter !== null) {
    setCurrentProjectContext(null);
    projectManager.renderFilteredTodos(filter);
  }
}