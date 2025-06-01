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

  const title = document.createElement("h3");
  title.textContent = todo.title;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = todo.description;

  const dueDate = document.createElement("p");
  dueDate.classList.add("due-date");
  dueDate.textContent = dateFormatter(todo.due);

  div.append(title, description, dueDate);

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