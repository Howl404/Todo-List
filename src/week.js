export { createWeek };

const createWeek = function () {
  const contentDiv = document.querySelector(".content");

  const mainDiv = document.createElement("div");
  const header = document.createElement("h2");

  mainDiv.classList.add("main-content");

  header.innerHTML = "Week";

  contentDiv.appendChild(mainDiv);
  mainDiv.appendChild(header);
};
