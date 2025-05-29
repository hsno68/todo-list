export function generateId() {
  const timestampBase36Id = Date.now().toString(36);
  return timestampBase36Id;
}

export function createItem({ className, object }) {
  const div = document.createElement("div");
  div.classList.add(className);

  for (const prop in object) {
    if (prop === "element") {
      continue;
    }
    const content = document.createElement("p");
    content.textContent = object[prop];
    div.appendChild(content);
  }

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