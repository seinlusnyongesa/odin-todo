const Project = require("./project");
import todoFactory from "./todo";

const projectList = (function () {
  let projects = [];

  let _initial = ["home"];

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

  function addTodos(id, values) {
    let todo = todoFactory();
    Object.assign(todo, values);

    for (let i of projects) {
      if (i.id === id) {
        i.addTodo(todo);
      }
    }
  }

  function removeTodo(projId, elementId) {
    for (let i of projects) {
      if (i.id === projId) {
        i.deleteTodo(elementId);
      }
    }
  }

  function deleteProject(id) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        projects.splice(i, 1);
      }
    }
  }

  function completeTodo(projId, elementId) {
    for (let i of projects) {
      if (i.id === projId) {
        i.completeTodo(elementId);
      }
    }
  }

  function clear() {
    while (projects.length > 0) {
      projects.pop();
    }
  }

  return {
    projects,
    addProject,
    clear,
    deleteProject,
    addTodos,
    removeTodo,
    completeTodo,
  };
})();

export default projectList;
