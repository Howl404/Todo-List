export { addTask, updateToday };
export { Todos };
export { updateEverything };
import { compareAsc, format } from "date-fns";

const addTask = function () {
  document.querySelector(".add-task").addEventListener("click", function () {
    document.querySelector(".add-task").style.display = "none";

    const input = document.createElement("input");
    const buttonsDiv = document.createElement("div");

    input.classList.add("input");
    buttonsDiv.classList.add("button-container");

    const applyButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    applyButton.innerHTML = "Apply";
    cancelButton.innerHTML = "Cancel";

    applyButton.classList.add("apply");
    cancelButton.classList.add("cancel");

    const content = document.querySelector(".main-content");

    content.appendChild(input);
    content.appendChild(buttonsDiv);

    buttonsDiv.appendChild(applyButton);
    buttonsDiv.appendChild(cancelButton);

    applyButton.addEventListener("click", function () {
      console.log(input.value);
      if (input.value === "") {
        const obj = new Todo(defaultName, "", "", defaultName);
        defaultName++;
        Todos.push(obj);
        console.log(Todos);
        document.querySelector(".add-task").style.display = "block";
        document.querySelector(".input").remove();
        document.querySelector(".button-container").remove();
      } else {
        const obj = new Todo(input.value, "", "", defaultName);
        defaultName++;
        Todos.push(obj);
        console.log(Todos);
        document.querySelector(".add-task").style.display = "block";
        document.querySelector(".input").remove();
        document.querySelector(".button-container").remove();
      }
      updateEverything();
    });

    cancelButton.addEventListener("click", function () {
      document.querySelector(".add-task").style.display = "block";
      document.querySelector(".input").remove();
      document.querySelector(".button-container").remove();
      updateEverything();
    });

    class Todo {
      constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
      }
    }
  });
};

let defaultName = 1;
let Todos = [];
let todayDate = new Date();

const updateToday = function () {
  const today = Todos.filter(function (el) {
    return el.dueDate === todayDate;
  });

  for (let i = 0; i < today.length; i++) {
    const div = document.createElement("div");

    const name = document.createElement("p");
    const date = document.createElement("input");

    date.type = "date";

    name.classList.add("name");
    date.classList.add("date");
    div.classList.add("todo-div");

    name.innerHTML = today[i].title;
    date.value = today[i].dueDate;

    const list = document.querySelector(".main-content");
    const addTask = document.querySelector(".add-task");

    list.insertBefore(div, addTask);
    div.appendChild(name);
    div.appendChild(date);
  }
};

const updateEverything = function () {
  Todos = Todos.sort((a, b) => {
    return a.priority - b.priority;
  });
  document.querySelectorAll(".todo-div").forEach(function (element) {
    element.remove();
  });

  for (let i = 0; i < Todos.length; i++) {
    const div = document.createElement("div");

    const name = document.createElement("p");
    const priority = document.createElement("div");
    const date = document.createElement("input");

    date.type = "date";

    const priorityText = document.createElement("p");
    const priorityUp = document.createElement("button");
    const priorityDown = document.createElement("button");

    name.classList.add("name");
    priority.classList.add("priority");
    date.classList.add("date");
    div.classList.add("todo-div");

    name.innerHTML = Todos[i].title;
    priorityText.innerHTML = Todos[i].priority;
    date.value = Todos[i].dueDate;
    priorityDown.innerHTML = "-";
    priorityUp.innerHTML = "+";

    const list = document.querySelector(".main-content");
    const addTask = document.querySelector(".add-task");

    list.insertBefore(div, addTask);
    div.appendChild(name);
    div.appendChild(priority);
    div.appendChild(date);

    priority.appendChild(priorityText);
    priority.appendChild(priorityUp);
    priority.appendChild(priorityDown);

    priorityDown.addEventListener("click", function () {
      Todos[i].priority++;
      Todos[i].dueDate++;
      updateEverything();
    });

    priorityUp.addEventListener("click", function () {
      Todos[i].priority--;
      Todos[i].dueDate--;
      updateEverything();
    });

    date.addEventListener("input", function (e) {
      Todos[i].dueDate = e.target.value;
      console.log(e.target.value);
    });
  }
};
