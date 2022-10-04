const { v4: uuidv4 } = require("uuid");

function Project(name) {
  let project = {};

  project.id = uuidv4();
  project.name = name;
  project.todos = [];

  project.addTodo = function (todo) {
    if (todo.title === "" || todo.description === "" || todo.dueDate === "") {
      alert("fill in the fields before submiting");
      return;
    }
    for (let i of project.todos) {
      if (i.title === todo.title) {
        alert("task exists, use another name");
        return;
      }
    }
    project.todos.push(todo);
  };

  project.deleteTodo = function (id) {
    for (let i of project.todos) {
      if (i.id === id) {
        project.todos.splice(i, 1);
      }
    }
  };
  project.completeTodo = function (id) {
    for (let i of project.todos) {
      if (i.id === id) {
        i.completeTodo(id);
      }
    }
  };
  project.clear = function () {
    while (this.todos.length > 0) {
      project.todos.pop();
    }
  };

  project.rename = function (name) {
    project.name = name;
  };

  return project;
}

module.exports = Project;
