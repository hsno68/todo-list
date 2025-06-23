import getDOMElements from "./../../utility/dom";

let deleteMode = null;
let deleteItem = null;

export default function setupDeleteDialogForm({ mode, project, todo }) {
  const { deleteDialog, deleteMessage } = getDOMElements();

  const type = mode === "project" ? "project" : "todo";
  const item = mode === "project" ? project : todo;

  deleteMode = type;
  deleteItem = item;

  const message = createDeleteMessage(type, item.title);
  deleteMessage.innerHTML = message;

  deleteDialog.showModal();
}

function createDeleteMessage(type, title) {
  return `Are you sure you want to delete this <span class="delete-title">"${title}"</span> ${type}? This action cannot be undone and there is no saved state for deleted ${type}s.`;
}

export function getDeleteContext() {
  return {
    mode: deleteMode,
    item: deleteItem,
  }
}