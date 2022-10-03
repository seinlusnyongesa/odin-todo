const Project = require("./project");

function ProjectList() {
  let projects = [];

  let _initial = ["home", "today"];

  for (let i of _initial) {
    projects.push(Project(i));
  }

  function addProject(project) {
    projects.push(project);
  }

  function clear() {
    while (projects.length > 0) {
      projects.pop();
    }
  }
  return { projects, addProject, clear };
}

module.exports = ProjectList;
