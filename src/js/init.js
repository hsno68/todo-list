import setupProjects from "./setup/setupProjects.js";
import setupUI from "./setup/setupUI.js";
import setupEventListeners from "./setup/setupEventListeners.js"

export default function init() {
  setupProjects();
  setupUI();
  setupEventListeners();
}