import "./reset.css";
import "./style.css";
import { createEverything } from "./everything.js";
import { createToday } from "./today.js";
import { createWeek } from "./week.js";
import {
  addTask,
  updateEverything,
  updateToday,
  updateWeek,
} from "./addTask.js";

function createProject(projectName) {
  projects[projectName] = [];
}

let projects = {};
let currentProject = "Default";

const checkLocal = function () {
  if (window.localStorage.getItem("projects") !== null) {
    let data = window.localStorage.getItem("projects");
    projects = JSON.parse(data);
    let current = window.localStorage.getItem("currentProject");
    currentProject = current;
  }
};

window.addEventListener("beforeunload", () => {
  window.localStorage.setItem("projects", JSON.stringify(projects));
  window.localStorage.setItem("currentProject", currentProject);
});

const displayProjects = function () {
  if (document.querySelector(".project-list") !== null) {
    document.querySelector(".project-list").remove();
  }

  const div = document.createElement("div");

  div.classList.add("project-list");
  document.querySelector(".sidebar").appendChild(div);

  Object.keys(projects).forEach((key) => {
    console.log(currentProject);
    const projectDiv = document.createElement("div");

    projectDiv.classList.add("project");

    div.appendChild(projectDiv);

    const button = document.createElement("button");

    button.innerHTML = key;
    button.classList.add("project");
    button.classList.add(`project-${key}`);
    projectDiv.appendChild(button);

    button.addEventListener("click", () => {
      console.log(key);
      document
        .querySelector(`.project-${currentProject}`)
        .classList.remove("selected");
      document.querySelector(`.project-${key}`).classList.add("selected");
      currentProject = key;
      cleanDisplay();
      createEverything();
      addTask(projects[currentProject]);
      updateEverything(projects[currentProject]);
    });

    if (key === "Default") {
      button.classList.add("default");
    } else {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = "Delete";
      projectDiv.appendChild(deleteButton);
      deleteButton.addEventListener("click", () => {
        delete projects[key];
        currentProject = "Default";
        cleanDisplay();
        createEverything();
        addTask(projects[currentProject]);
        updateEverything(projects[currentProject]);
        cleanProjects();
        displayProjects();
      });
    }
  });
};

const cleanProjects = function () {
  document.querySelectorAll(".project").forEach((e) => {
    e.remove();
  });
};

document.addEventListener("DOMContentLoaded", function () {
  createProject("Default");

  checkLocal();
  createEverything();
  addTask(projects[currentProject]);
  updateEverything(projects[currentProject]);
  cleanProjects();
  displayProjects();
  document
    .querySelector(`.project-${currentProject}`)
    .classList.add("selected");
});

document.querySelector(".everything").addEventListener("click", function () {
  cleanDisplay();
  createEverything();
  addTask(projects[currentProject]);
  updateEverything(projects[currentProject]);
});

document.querySelector(".today").addEventListener("click", function () {
  cleanDisplay();
  createToday(projects[currentProject]);
  updateToday(projects[currentProject]);
});

document.querySelector(".week").addEventListener("click", function () {
  cleanDisplay();
  createWeek(projects[currentProject]);
  updateWeek(projects[currentProject]);
});

document
  .querySelector(".check-projects")
  .addEventListener("click", function () {
    console.log(projects);
    console.log(currentProject);
  });

document.querySelector(".add-project").addEventListener("click", function () {
  const name = prompt("Project name");
  console.log(prompt);
  if (projects[name] === undefined && name !== "") {
    createProject(name);
    document
      .querySelector(`.project-${currentProject}`)
      .classList.remove("selected");
    currentProject = name;
    cleanDisplay();
    createEverything();
    addTask(projects[currentProject]);
    updateEverything(projects[currentProject]);
    cleanProjects();
    displayProjects();
    document
      .querySelector(`.project-${currentProject}`)
      .classList.add("selected");
  } else alert("Project already exists or nothing typed");
});

const cleanDisplay = function () {
  const content = document.querySelector(".main-content");
  content.remove();
};
