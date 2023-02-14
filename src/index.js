import "./reset.css";
import "./style.css";
import { createEverything } from "./everything.js";
import { createToday } from "./today.js";
import { createWeek } from "./week.js";
import { addTask, Todos, updateEverything, updateToday } from "./addTask.js";
import { compareAsc, format } from "date-fns";

document.addEventListener("DOMContentLoaded", function () {
  createEverything();
  addTask();
});

document.querySelector(".everything").addEventListener("click", function () {
  cleanDisplay();
  createEverything();
  addTask();
  updateEverything();
});

document.querySelector(".today").addEventListener("click", function () {
  cleanDisplay();
  createToday();
  updateToday();
});

document.querySelector(".week").addEventListener("click", function () {
  cleanDisplay();
  createWeek();
});

const cleanDisplay = function () {
  const content = document.querySelector(".main-content");
  content.remove();
};

console.log((s = new Date()));
