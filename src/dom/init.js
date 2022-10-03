const ProjectList = require("../modules/projectList");

// display available projects

const projectsContainer = document.querySelector(".projects-container");
const defaultProjectContainer = document.querySelector(".default-projects");
function createProjects() {
  for (let i of ProjectList().projects) {
    if (i.name !== "home" && i.name !== "today") {
      projectsContainer.innerHTML += `
      <div class="project project-list link" id="link">
        <div>
          <img src="./checkbox.png" alt="project image" />
          <p> ${i.name}</p>
        </div>
        <button>
          <img src="./close.png" alt="remove project" />
        </button>
      </div>`;
    } else if (i.name === "home") {
      defaultProjectContainer.innerHTML += `<div class="project-list link active" id="link">
        <img src="./home.png" alt="home image" />
        <p>${i.name}</p>
      </div>`;
    } else if (i.name === "today") {
      defaultProjectContainer.innerHTML += `<div class="project-list link" id="link">
        <img src="./calendar.png" alt="home image" />
        <p>${i.name}</p>
      </div>`;
    }
  }
}

//populate todos for a selected project

const todos = document.querySelector(".todos");
function createTodo(name) {
  for (let i of ProjectList().projects) {
    if ((i.name = name)) {
      for (let j of i.todos) {
        todos.innerHTML += `<div class="todo-container">
            <div class="todo-prop">
              <div class="todo-title">
                <p>${j.title}</p>
              </div>
              <div class="todo-btns-container">
                <button class="todo-btns">complete</button>
                <button class="todo-btns">delete</button>
              </div>
            </div>
            <div class="more-details hide-more-details">
              <p>title: ${j.title}</p>
              <p>description: some cool descritption</p>
              <p>due date: ${j.dueDate}</p>
              <p>priority: ${j.priority}</p>
            </div>
          </div>`;
      }
    }
  }
}

// show addProject form
const showAddProjectFormBtn = document.querySelector(".add-project");
showAddProjectFormBtn.addEventListener("click", showAddProjectForm);

function showAddProjectForm() {
  const projectForm = document.querySelector(".project-form");
  projectForm.classList.remove("hide-form");
}

//hide addProject form

const closeAddProjectFormBtn = document.querySelector(
  ".form-btns button:nth-child(1)"
);
closeAddProjectFormBtn.addEventListener("click", closeAddProjectsForm);

function closeAddProjectsForm(e) {
  e.preventDefault();
  const projectForm = document.querySelector(".project-form");
  projectForm.classList.add("hide-form");
}

//show addTodo Form
const showAddTodoFormBtn = document.querySelector(".add-todo");
showAddTodoFormBtn.addEventListener("click", showAddTodoForm);

function showAddTodoForm() {
  const todoForm = document.querySelector(".todo-form");
  todoForm.classList.remove("hide-form");
}
//close addTodo Form

const closeAddTodoFormBtn = document.querySelector(
  ".todo-form button:nth-child(1)"
);
closeAddTodoFormBtn.addEventListener("click", closeAddTodoForm);

function closeAddTodoForm(e) {
  e.preventDefault();
  const todoForm = document.querySelector(".todo-form");
  todoForm.classList.add("hide-form");
}

// update active project
const allProjectLinks = document.querySelectorAll("#link");
allProjectLinks.forEach((link) => {
  link.addEventListener("click", () => console.log("fir"));
});

console.log(allProjectLinks);

function changeActiveLink() {
  //   allProjectLinks.forEach((link) => link.classList.remove("active"));
  //   console.log(this);
  //   this.classList.add("active");
  console.log(first);
}

module.exports = { createProjects, createTodo };
