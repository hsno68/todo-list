export default function addItem(todoId, todoCollectionObject, todoCollectionArray, todoItem) {
  todoCollectionObject[todoId] = todoItem;
  todoCollectionArray.push(todoId);
}