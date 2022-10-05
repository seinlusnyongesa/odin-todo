const Project = require("./project");
import todoFactory from "./todo";
import Storage from "./storage";

const projectList = (function () {
  let projects = [];

  let _initial = ["home"];

  for (let i of _initial) {
    if (getItems()) {
      let items = getItems().map((item) => item);
      for (let i of items) {
        let id = addProject(Project(i.name));
        // addProject();
        for (let j of i.todos) {
          let { title, description, dueDate } = j;
          addTodos(id, { title, description, dueDate });
        }
      }
    } else {
      addProject(Project(i));
    }
  }

  function addProject(project) {
    for (let i of projects) {
      if (i.name === project.name) {
        alert("name already exists");
        return;
      }
    }
    projects.push(project);
    _store();
    return project.id;
  }

  function addTodos(id, values) {
    let todo = todoFactory();
    Object.assign(todo, values);

    for (let i of projects) {
      if (i.id === id) {
        console.log(i.todos);
        i.addTodo(todo);
      }
    }
    _store();
  }

  function removeTodo(projId, elementId) {
    for (let i of projects) {
      if (i.id === projId) {
        i.deleteTodo(elementId);
      }
    }
    _store();
  }

  function deleteProject(id) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        projects.splice(i, 1);
      }
    }
    _store();
  }

  function completeTodo(projId, elementId) {
    for (let i of projects) {
      if (i.id === projId) {
        i.completeTodo(elementId);
      }
    }
    _store();
  }

  function clear() {
    while (projects.length > 0) {
      projects.pop();
    }
  }

  function _store() {
    Storage.storeItem("projects", projects);
  }
  function getItems() {
    return Storage.getItem("projects");
  }

  function firstItem() {
    return projects[0].id;
  }

  return {
    projects,
    addProject,
    clear,
    deleteProject,
    addTodos,
    removeTodo,
    completeTodo,
    firstItem,
  };
})();

export default projectList;
