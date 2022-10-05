import UI from "./dom/ui";
import projectList from "./modules/projectList";

document.addEventListener("DOMContentLoaded", () => {
  UI.loadProjects(), UI.loadTodo(projectList.firstItem());
});
