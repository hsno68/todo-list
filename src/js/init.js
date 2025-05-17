import setupProject from "./app/setupProject.js";
import setupEventListeners from "./UI/setupEventListeners.js";

export default function init() {
  setupProject();
  setupEventListeners();
}