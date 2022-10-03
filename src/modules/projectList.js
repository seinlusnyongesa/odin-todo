const Project = require("./project");

const projectList = (function () {
  let projects = [];

  let _initial = ["home", "another", "ashiee"];

  for (let i of _initial) {
    addProject(Project(i));
  }

  function addProject(project) {
    for (let i of projects) {
      if (i.name === project.name) {
        alert("name already exists");
        return;
      }
    }
    projects.push(project);
  }

  function deleteProject(name) {
    const modifiedList = projects.filter((project) => project.name !== name);
    let projects = modifiedList;
  }

  function clear() {
    while (projects.length > 0) {
      projects.pop();
    }
  }
  return { projects, addProject, clear, deleteProject };
})();

module.exports = projectList;
