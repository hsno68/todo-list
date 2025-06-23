import setupProjects from "./setupProjects.js";
import setupEventListeners from "./setupEventListeners.js";

export default function init() {
  setupProjects();
  setupEventListeners();
}