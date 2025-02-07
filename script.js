console.log("hello word");

const todosList = document.querySelector(".todos-list");
const addTodoButton = document.querySelector(".add-todo");
const backgroundSelectorEl = document.querySelector(".background-selector");

backgroundSelectorEl.addEventListener("click", (e) => {
  console.log({
    target: e.target,
    currentTarget: e.currentTarget,
  });
  const backgroundImage = e.target.style.backgroundImage;
  document.body.style.backgroundImage = backgroundImage;
});

addTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const newID = Date.now();
  const newTodos = [
    ...appState.todos,
    {
      id: newID,
      text: "Untitled",
      completed: false,
    },
  ].sort((a, b) => a.completed - b.completed);
  appState.todos = newTodos;
  renderTodos();
  const ceratedTodoEl = document.querySelector(`[data-id="${newID}"]`);
  ceratedTodoEl.querySelector(".todo-text").click();
  const inputEl = ceratedTodoEl.querySelector("input.todo-text");
  inputEl.select();
}

const appState = {
  todos: [
    {
      id: 1,
      text: "Learn JS",
      completed: true,
    },
    {
      id: 2,
      text: "Learn React",
      completed: false,
    },
  ],
};

function renderTodos() {
  todosList.innerHTML = "";
  for (const todo of appState.todos) {
    const todoEl = createTodo(todo);
    todosList.appendChild(todoEl);
    lucide.createIcons();
  }
}

renderTodos();

/*
<div class="todo">
          <div class="todo-checkbox">
            <div class="todo-checkbox-circle"></div>
            <input type="checkbox" />
          </div>
          <p class="todo-text">Learn HTML</p>
          <button class="todo-delete">
            <i data-lucide="trash"></i>
          </button>
        </div>
*/

function createTodo(todo) {
  //todo
  const todoEl = document.createElement("div");
  todoEl.setAttribute("data-id", todo.id);
  todoEl.classList.add("todo");
  if (todo.completed) {
    todoEl.classList.add("checked");
  }

  const checkbox = createCheckbox(todo);
  const text = createTextElement(todo);
  const trashButton = createDeleteButton(todo);
  todoEl.appendChild(checkbox);
  todoEl.appendChild(text);
  todoEl.appendChild(trashButton);

  return todoEl;
}

function createCheckbox(todo) {
  //checkbox
  const todoCheckbox = document.createElement("div");
  const todoCheckboxCircle = document.createElement("div");
  const todoCheckboxInput = document.createElement("input");
  todoCheckboxInput.addEventListener("change", (e) => {
    const newTodos = appState.todos
      .map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      })
      .sort((a, b) => a.completed - b.completed);
    appState.todos = newTodos;
    renderTodos();
  });

  todoCheckbox.classList.add("todo-checkbox");
  todoCheckboxCircle.classList.add("todo-checkbox-circle");
  todoCheckboxInput.type = "checkbox";
  todoCheckbox.appendChild(todoCheckboxCircle);
  todoCheckbox.appendChild(todoCheckboxInput);
  return todoCheckbox;
}

function createTextElement(todo) {
  const textEl = document.createElement("p");
  const inputEl = document.createElement("input");
  inputEl.style.display = "none";

  textEl.addEventListener("click", () => {
    textEl.style.display = "none";
    inputEl.style.display = "block";
    inputEl.focus();
  });

  function editTodo(newValue) {
    const value = inputEl.value;
    const newTodos = appState.todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          text: newValue,
        };
      }
      return t;
    });
    appState.todos = newTodos;
    renderTodos();
  }

  inputEl.addEventListener("blur", (e) => {
    const value = e.target.value;
    editTodo(value);
  });

  inputEl.addEventListener("keydown", (e) => {
    e.key === "Enter" && editTodo(e.target.value);
  });

  textEl.classList.add("todo-text");
  inputEl.classList.add("todo-text");
  textEl.textContent = todo.text;
  inputEl.value = todo.text;
  const container = document.createElement("div");
  container.appendChild(textEl);
  container.appendChild(inputEl);
  container.classList.add("todo-text-container");
  return container;
}

function createDeleteButton(todo) {
  console.log("delete", todo);
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("todo-delete");
  const i = document.createElement("i");
  i.setAttribute("data-lucide", "trash");
  buttonEl.appendChild(i);
  lucide.createIcons();

  buttonEl.addEventListener("click", () => {
    const newTodos = appState.todos.filter((t) => t.id !== todo.id);
    appState.todos = newTodos;
    renderTodos();
  });
  return buttonEl;
}
