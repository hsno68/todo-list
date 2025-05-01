export default function makeProject(name = "Untitled") {
  const tasksByIds = {};
  const allTaskIds = [];
  return {
    name,
    tasksByIds,
    allTaskIds
  };
}