import generateId from "./idGenerator.js";

export default class TodoMaker {
  todoId =  generateId();

  constructor({ title, description, due, priority }) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.priority = priority;

    Object.defineProperty(this, "todoId", {enumerable: false})
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("box");
    for (const prop in this) {
      const content = document.createElement("p");
      content.textContent = this[prop];
      div.appendChild(content);
    }
    return div;
  }
}