export default function addProject(projectId, projectsCollectionObject, projectsCollectionArray, project) {
  projectsCollectionObject[projectId] = project;
  projectsCollectionArray.push(projectId);
}