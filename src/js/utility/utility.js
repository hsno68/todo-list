export function generateId() {
  const timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}

function dateFormatter(date) {
  if (!date) {
    return "No due date";
  }

  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}

export function createTodoElement(todo) {
  const div = document.createElement("div");
  div.classList.add("todo");

  const checkbox = createCheckbox();

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

  div.append(checkbox, container, description, dueDate);

  return div;
}

export function createProjectElement(project) {
    const div = document.createElement("div");
    div.classList.add("project");

    const content = document.createElement("p");
    content.textContent = project.title;

    div.appendChild(content);

    return div;
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

const checkboxAttributes = {
  type: "checkbox",
  name: "completed"
};

function createCheckbox() {
  const checkbox = document.createElement("input");
  for (const [attribute, value] of Object.entries(checkboxAttributes)) {
    checkbox.setAttribute(attribute, value);
  }
  return checkbox;
}

export function toggleCheckbox(todo, checkbox) {
  todo.element.addEventListener("click", (event) => {
    if (event.target !== checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    todo.completed = checkbox.checked;
  });
}

export function isDueToday(due) {
  const today = new Date().toISOString().split("T")[0];
  return due === today;
}

export function isDueThisWeek(due) {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const dueDate = new Date(due);
  return dueDate >= startOfWeek && dueDate <= endOfWeek;
}