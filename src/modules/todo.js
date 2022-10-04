const { v4: uuidv4 } = require("uuid");

const todoFactory = (title, description, dueDate, priority) => {
  let todo = {};
  todo.id = uuidv4();
  todo.title = title;
  todo.description = description;
  todo.dueDate = dueDate;
  todo.priority = priority;
  todo.completed = false;

  todo.completeTodo = function () {
    todo.completed = true;
  };

  todo.changePriority = function (priority) {
    todo.priority = priority;
  };

  todo.changeDescription = function (desc) {
    todo.description = desc;
  };

  todo.changeTitle = function (title) {
    todo.title = title;
  };

  return todo;
};

module.exports = todoFactory;
