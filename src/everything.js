export { createEverything };

const createEverything = function () {
  const contentDiv = document.querySelector(".content");

  const mainDiv = document.createElement("div");
  const header = document.createElement("h2");
  const addTask = document.createElement("button");

  addTask.classList.add("add-task");

  mainDiv.classList.add("main-content");

  header.innerHTML = "Everything";
  addTask.innerHTML = "+ Add Task";

  contentDiv.appendChild(mainDiv);
  mainDiv.appendChild(header);

  mainDiv.appendChild(addTask);
};
