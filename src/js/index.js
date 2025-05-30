console.log("Script loaded. DOMContentLoaded?", document.readyState);
console.log("projectsContainer:", document.querySelector("div.projects-container"));

import "./../css/styles.css";
import init from "./init/init.js";

init();