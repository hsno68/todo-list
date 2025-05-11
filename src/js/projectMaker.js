import generateId from "./idGenerator.js";

export default class ProjectMaker {
  projectId = generateId();
  todosByIdsObject = {};
  allTodoIdsArray = [];

  constructor(title) {
    this.title = title;

    Object.defineProperties(this, {
      todosByIdsObject: {enumerable: false},
      allTodoIdsArray: {enumerable: false},
    });
  }

  addTodoItem(todoId, todoItem) {
    this.todosByIdsObject[todoId] = todoItem;
    this.allTodoIdsArray.push(todoId);
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("box");
    const content = document.createElement("p");
    content.textContent = this.title;
    div.appendChild(content);
    return div;
  }
}