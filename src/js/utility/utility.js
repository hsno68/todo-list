import getDOMElements from "./dom.js";
import projectManager from "./../app/projectManager.js";
import { getCurrentFilterContext, getCurrentProjectContext, setCurrentFilterContext, setCurrentProjectContext } from "./contextController.js";

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
    day: "2-digit", // e.g., 09
    year: "numeric", // e.g., 2025
  });
}

export function createTodoElement(todo) {
  const li = document.createElement("li");
  li.classList.add("todo");

  if (todo.completed) {
    li.classList.add("completed");
  }

  if (todo.important) {
    li.classList.add("important");
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

export function createProjectElement({ project, isSelected }) {
  const li = document.createElement("li");
  li.classList.add("project");
  li.setAttribute("role", "tab");

  if (isSelected) {
    li.setAttribute("aria-selected", "true");
    li.setAttribute("tabindex", "0");
  } else {
    li.setAttribute("aria-selected", "false");
    li.setAttribute("tabindex", "-1");
  }

  const title = document.createElement("p");
  title.textContent = project.title;

  li.appendChild(title);

  return li;
}

export function createButton({ iconName, text, buttonClass, callback }) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");

  if (iconName) {
    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded");
    span.textContent = iconName;
    button.appendChild(span);
  }

  if (text) {
    const textNode = document.createTextNode(text);
    button.appendChild(textNode);
  }

  if (buttonClass) {
    button.classList.add(buttonClass);
  }

  if (callback) {
    button.addEventListener("click", callback);
  }

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

export function renderTodosBasedOnContext() {
  const filter = getCurrentFilterContext();
  const activeProject = getCurrentProjectContext();

  if (filter === null && activeProject !== null) {
    activeProject.renderTodos();
  } else if (filter !== null) {
    setCurrentProjectContext(null);
    projectManager.renderFilteredTodos(filter);
  }
}

export function persistAppState() {
  const appState = {
    projectManager: projectManager.serialize(),
    currentFilterContext: getCurrentFilterContext(),
    currentProjectContextId: getCurrentProjectContext()?.id ?? null,
  };

  localStorage.setItem("appState", JSON.stringify(appState));
}

export function loadAppState() {
  const appData = localStorage.getItem("appState");
  if (!appData) {
    return;
  }

  const { projectManager: data, currentFilterContext, currentProjectContextId } = JSON.parse(appData);

  projectManager.hydrate(data);
  const hydratedProject = projectManager.get(currentProjectContextId);
  const filterButton = document.querySelector(`button#${currentFilterContext}`);
  if (hydratedProject) {
    toggleSelectedTab(hydratedProject.element);
  } else if (filterButton) {
    toggleSelectedTab(filterButton);
  }
  setCurrentFilterContext(currentFilterContext);
  setCurrentProjectContext(hydratedProject);
}

export function toggleSelectedTab(element) {
  const allTabs = document.querySelectorAll('li[role="tab"]');

  for (const tab of allTabs) {
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
  }

  const selected = element.closest('li[role="tab"]');
  selected.setAttribute("aria-selected", "true");
  selected.setAttribute("tabindex", "0");
}

export function closeDropdown() {
  const dropdown = document.querySelector(".buttons.open");
  if (dropdown) {
    dropdown.classList.remove("open");
  }
}

export function closeSidebarMenu() {
  const sidebar = document.querySelector('.content-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}