export { addTask, updateToday, updateWeek };
export { updateEverything };
import { format } from "date-fns";

let defaultName = 1;
let todayDate = format(new Date(), "yyyy-MM-dd");

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const addTask = function (Todos) {
  const add = function () {
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
      if (input.value === "") {
        const obj = new Todo(
          defaultName.toString(),
          "",
          todayDate,
          defaultName
        );
        defaultName++;
        Todos.push(obj);
        console.log(Todos);
        document.querySelector(".add-task").style.display = "block";
        document.querySelector(".input").remove();
        document.querySelector(".button-container").remove();
      } else {
        const obj = new Todo(
          input.value.toString(),
          "",
          todayDate,
          defaultName
        );
        defaultName++;
        Todos.push(obj);
        console.log(Todos);
        document.querySelector(".add-task").style.display = "block";
        document.querySelector(".input").remove();
        document.querySelector(".button-container").remove();
      }
      updateEverything(Todos);
    });

    cancelButton.addEventListener("click", function () {
      document.querySelector(".add-task").style.display = "block";
      document.querySelector(".input").remove();
      document.querySelector(".button-container").remove();
      updateEverything(Todos);
    });
  };

  document.querySelector(".add-task").addEventListener("click", add);
};

const updateToday = function (Todos) {
  const today = Todos.filter(function (el) {
    return el.dueDate === todayDate;
  });

  document.querySelectorAll(".todo-div").forEach(function (element) {
    element.remove();
  });

  for (let i = 0; i < today.length; i++) {
    const div = document.createElement("div");

    const name = document.createElement("button");
    const date = document.createElement("input");

    date.type = "date";

    name.classList.add("name");
    date.classList.add("date");
    div.classList.add("todo-div");

    name.innerHTML = today[i].title;
    date.value = today[i].dueDate;

    const list = document.querySelector(".main-content");
    const addTask = document.querySelector(".add-task");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";

    list.insertBefore(div, addTask);
    div.appendChild(deleteButton);
    div.appendChild(name);
    div.appendChild(date);

    deleteButton.addEventListener("click", function () {
      const find = Todos.findIndex((item) => {
        return item.title == name.innerHTML;
      });

      Todos.splice(find, 1);

      updateToday();
    });

    date.addEventListener("input", function (e) {
      Todos[i].dueDate = e.target.value;
      console.log(e.target.value);
      updateToday(Todos);
    });

    name.addEventListener("click", function (e) {
      name.style.display = "none";

      const inputName = document.createElement("input");
      inputName.value = Todos[i].title;

      inputName.classList.add("input-name");
      div.insertBefore(inputName, date);

      inputName.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (Todos.map((item) => item.title).indexOf(inputName.value) !== -1) {
            alert("Task with same title already exists");
            updateToday(Todos);
          } else {
            e.preventDefault();
            Todos[i].title = inputName.value;
            updateToday(Todos);
          }
        }
      });
    });
  }
};

const updateWeek = function (Todos) {
  let week = [];

  const checkWeek = function (t, d) {
    const day = Number(t.slice(-2));
    const due = Number(d.slice(-2));
    if (due >= day && due < day + 7) {
      return true;
    } else return false;
  };

  for (let i = 0; i < Todos.length; i++) {
    if (checkWeek(todayDate, Todos[i].dueDate) === true) {
      week.push(Todos[i]);
    }
  }

  document.querySelectorAll(".todo-div").forEach(function (element) {
    element.remove();
  });

  for (let i = 0; i < week.length; i++) {
    const div = document.createElement("div");

    const name = document.createElement("button");
    const date = document.createElement("input");

    date.type = "date";

    name.classList.add("name");
    date.classList.add("date");
    div.classList.add("todo-div");

    name.innerHTML = week[i].title;
    date.value = week[i].dueDate;

    const list = document.querySelector(".main-content");
    const addTask = document.querySelector(".add-task");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";

    list.insertBefore(div, addTask);
    div.appendChild(deleteButton);
    div.appendChild(name);
    div.appendChild(date);

    deleteButton.addEventListener("click", function () {
      const find = Todos.findIndex((item) => {
        return item.title == name.innerHTML;
      });

      Todos.splice(find, 1);

      updateWeek(Todos);
    });

    date.addEventListener("input", function (e) {
      Todos[i].dueDate = e.target.value;
      console.log(e.target.value);
      updateWeek(Todos);
    });

    name.addEventListener("click", function (e) {
      const index = Todos.map((item) => item.title).indexOf(
        Number(e.target.innerHTML)
      );

      name.style.display = "none";

      const inputName = document.createElement("input");
      inputName.value = Todos[i].title;

      inputName.classList.add("input-name");
      div.insertBefore(inputName, date);

      inputName.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (Todos.map((item) => item.title).indexOf(inputName.value) !== -1) {
            alert("Task with same title already exists");
            updateWeek(Todos);
          } else {
            e.preventDefault();
            Todos[i].title = inputName.value;
            updateWeek(Todos);
          }
        }
      });
    });
  }
};

const updateEverything = function (Todos) {
  Todos = Todos.sort((a, b) => {
    return a.priority - b.priority;
  });
  document.querySelectorAll(".todo-div").forEach(function (element) {
    element.remove();
  });

  for (let i = 0; i < Todos.length; i++) {
    const div = document.createElement("div");

    const name = document.createElement("button");
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

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";

    list.insertBefore(div, addTask);
    div.appendChild(deleteButton);
    div.appendChild(name);
    div.appendChild(priority);
    div.appendChild(date);

    deleteButton.addEventListener("click", function () {
      const find = Todos.findIndex((item) => {
        return item.title == name.innerHTML;
      });

      Todos.splice(find, 1);

      updateEverything(Todos);
    });

    priority.appendChild(priorityText);
    priority.appendChild(priorityUp);
    priority.appendChild(priorityDown);

    priorityDown.addEventListener("click", function () {
      Todos[i].priority++;
      updateEverything(Todos);
    });

    priorityUp.addEventListener("click", function () {
      Todos[i].priority--;
      updateEverything(Todos);
    });

    date.addEventListener("input", function (e) {
      Todos[i].dueDate = e.target.value;
      console.log(e.target.value);
    });

    name.addEventListener("click", function (e) {
      const index = Todos.map((item) => item.title).indexOf(
        Number(e.target.innerHTML)
      );

      name.style.display = "none";

      const inputName = document.createElement("input");
      inputName.value = Todos[i].title;

      inputName.classList.add("input-name");
      div.insertBefore(inputName, priority);

      inputName.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (Todos.map((item) => item.title).indexOf(inputName.value) !== -1) {
            alert("Task with same title already exists");
            updateEverything(Todos);
          } else {
            e.preventDefault();
            Todos[i].title = inputName.value;
            updateEverything(Todos);
          }
        }
      });
    });
  }
};
