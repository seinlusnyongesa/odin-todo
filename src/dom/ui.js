import Project from "../modules/project";
import projectList from "../modules/projectList";

export default class UI {
  // display available projects

  static loadProjects() {
    const projectsContainer = document.querySelector(".projects-container");
    const defaultProjectContainer = document.querySelector(".default-projects");

    for (let i of projectList.projects) {
      if (i.name !== "home") {
        projectsContainer.innerHTML += `
            <div class="project project-list link" data-name=${i.id} id="link">
              <div>
                <img src="./checkbox.png" alt="project image" />
                <p> ${i.name}</p>
              </div>
              <button>
                <img src="./close.png" alt="remove project" />
              </button>
            </div>`;
      } else if (i.name === "home") {
        defaultProjectContainer.innerHTML += `<div class="project-list link active" data-name=${i.id} id="link">
              <img src="./home.png" alt="home image" />
              <p>${i.name}</p>
            </div>`;
      }
    }
    UI.initProjectBtns();
    UI.updateActiveProject();
  }

  // populate todo for a selected project

  static loadTodo(id) {
    const todos = document.querySelector(".todos");
    const todosHeader = document.querySelector(".content>h1");
    for (let i of projectList.projects) {
      if (i.id === id) {
        todosHeader.innerHTML = `${i.name}`;
        for (let j of i.todos) {
          todos.innerHTML += `<div class="todo-container" data-id=${j.id}>
                    <div class="todo-prop">
                      <div class="todo-title">
                        <p>${j.title}</p>
                      </div>
                      <div class="todo-btns-container">
                        <button class="todo-btns">${
                          j.completed ? "completed" : "complete"
                        }</button>
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
    UI.initTodoBtns();
    UI.initTodoFormBtns();
  }

  static showProjectForm() {
    const projectForm = document.querySelector(".project-form");
    projectForm.classList.remove("hide-form");
  }
  static hideProjectForm(e) {
    e.preventDefault();
    const projectForm = document.querySelector(".project-form");
    projectForm.classList.add("hide-form");
  }

  static showTodoForm() {
    const todoForm = document.querySelector(".todo-form");
    todoForm.classList.remove("hide-form");
  }

  static hideTodoForm(e) {
    e.preventDefault();
    const todoForm = document.querySelector(".todo-form");
    todoForm.classList.add("hide-form");
  }

  static initProjectBtns() {
    const closeAddProjectFormBtn = document.querySelector(
      ".form-btns button:nth-child(1)"
    );
    closeAddProjectFormBtn.addEventListener("click", UI.hideProjectForm);
    const showAddProjectFormBtn = document.querySelector(".add-project");
    showAddProjectFormBtn.addEventListener("click", UI.showProjectForm);

    const submitProjectBtn = document.querySelector(
      ".project-form button:nth-child(2)"
    );

    submitProjectBtn.addEventListener("click", UI.getProjectInputvalue);

    const deleteProjectBtn = document.querySelectorAll(".project-list button");
    deleteProjectBtn.forEach((btn) => {
      btn.addEventListener("click", UI.removeProject);
    });
  }

  static initTodoFormBtns() {
    const showAddTodoFormBtn = document.querySelector(".add-todo");
    showAddTodoFormBtn.addEventListener("click", UI.showTodoForm);

    const closeAddTodoFormBtn = document.querySelector(
      ".todo-form button:nth-child(1)"
    );
    closeAddTodoFormBtn.addEventListener("click", UI.hideTodoForm);
    const submitTodoBtn = document.querySelector(
      ".todo-form button:nth-child(2)"
    );
    submitTodoBtn.addEventListener("click", UI.getTodoInputValues);
  }

  static updateActiveProject() {
    // update active project
    const allProjectLinks = document.querySelectorAll("#link");
    allProjectLinks.forEach((link) => {
      link.addEventListener("click", changeActiveLink);
    });

    function changeActiveLink() {
      allProjectLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      UI.clearTodoUI();
      UI.loadTodo(this.getAttribute("data-name"));
    }
  }

  static removeProject() {
    let name = this.parentElement.getAttribute("data-name");

    projectList.deleteProject(name);
    UI.clearProjectsUI();
    UI.loadProjects();
  }

  //projectForm
  static getProjectInputvalue(e) {
    e.preventDefault();
    const projectInput = document.querySelector("#project");
    const name = projectInput.value;
    if (name === "") {
      alert("category name cannot be null");
      return;
    }
    UI.hideProjectForm(e);
    UI.resetProjectInputValue(projectInput);

    UI.addProject(name);
  }

  static resetProjectInputValue(input) {
    input.value = "";
  }

  static addProject(name) {
    UI.clearProjectsUI();
    projectList.addProject(Project(name));
    UI.loadProjects();
  }

  static clearProjectsUI() {
    const projectsContainer = document.querySelector(".projects-container");
    const defaultProjectContainer = document.querySelector(".default-projects");

    while (projectsContainer.children.length > 1) {
      projectsContainer.lastChild.remove();
    }
    while (defaultProjectContainer.children.length > 0) {
      defaultProjectContainer.lastChild.remove();
    }
  }

  //todo form
  static getTodoInputValues(e) {
    e.preventDefault();
    const titleElement = document.querySelector("#title");
    const descriptionElement = document.querySelector("#description");
    const dueDateElement = document.querySelector("#duedate");
    const priorityElement = document.querySelector("#priority");

    const projectElement = document.querySelector(".active");
    const projectName = projectElement.getAttribute("data-name");

    const title = titleElement.value;
    const description = descriptionElement.value;
    const dueDate = dueDateElement.value;
    const priority = priorityElement.value;
    UI.addTodo(projectName, { title, description, dueDate, priority });
    UI.clearTodoForm(
      titleElement,
      descriptionElement,
      dueDateElement,
      priorityElement
    );
    UI.hideTodoForm(e);
  }

  static addTodo(name, values) {
    UI.clearTodoUI();
    projectList.addTodos(name, values);
    UI.loadTodo(name);
  }

  static clearTodoUI() {
    const todosContainer = document.querySelector(".todos");
    while (todosContainer.children.length > 0) {
      todosContainer.lastChild.remove();
    }
  }

  static clearTodoForm(title, description, dueDate, priority) {
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";
  }

  static initTodoBtns() {
    const completeBtn = document.querySelectorAll(
      ".todo-btns-container button:nth-child(1)"
    );
    completeBtn.forEach((btn) =>
      btn.addEventListener("click", UI.completeTodo)
    );

    const deleteBtn = document.querySelectorAll(
      ".todo-btns-container button:nth-child(2)"
    );
    deleteBtn.forEach((btn) => btn.addEventListener("click", UI.removeTodo));
  }

  static removeTodo() {
    const categoryId = document
      .querySelector(".active")
      .getAttribute("data-name");

    let todoId =
      this.parentElement.parentElement.parentElement.getAttribute("data-id");
    projectList.removeTodo(categoryId, todoId);
    UI.clearTodoUI();
    UI.loadTodo(categoryId);
  }

  static completeTodo() {
    console.log("complete");
  }
}
