import UI from "./dom/ui";
import Project from "./modules/project";

document.addEventListener("DOMContentLoaded", () => {
  UI.loadProjects(), UI.loadTodo("home");
});
