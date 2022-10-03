function Project(name) {
  let project = {};

  project.name = name;
  project.todos = [];

  project.addTodo = function (todo) {
    project.todos.push(todo);
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

export default Project;
