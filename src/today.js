export { createToday };

const createToday = function () {
  const contentDiv = document.querySelector(".content");

  const mainDiv = document.createElement("div");
  const header = document.createElement("h2");

  mainDiv.classList.add("main-content");

  header.innerHTML = "Today";

  contentDiv.appendChild(mainDiv);
  mainDiv.appendChild(header);
};
