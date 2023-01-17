let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton");
let saveTodoButtonEl = document.getElementById("saveTodoButton");
let todoUserInputEl = document.getElementById("todoUserInput");
let removeButtonEl = document.getElementById("removeButton");

removeButtonEl.onclick = function() {
    localStorage.removeItem("todoList");
}

function getTodo() {
    let todo = localStorage.getItem("todoList");
    if (todo === null) {
        return [];
    } else {
        return JSON.parse(todo);
    }
}


let todoList = getTodo();
let unique_no = todoList.length;

function onTodoStatusChange(labelId, unique_no, todoId) {
    let lbl = document.getElementById(labelId);
    lbl.classList.toggle("checked");

    let todoIndex = todoList.findIndex(function(eachItem) {
        let eachTodoIndex = "todo" + eachItem.uniqueNo;
        if (todoId === eachTodoIndex) {
            return true;
        }
    });

    let todoObject = todoList[todoIndex];
    console.log(todoObject);

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function removeTodoElement(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.getElementById(todoId);
    let todoIndex = todoList.findIndex(function(eachItem) {
        let eachTodoIndex = "todo" + eachItem.uniqueNo;
        if (todoId === eachTodoIndex) {
            return true;
        }
    });
    console.log(todoIndex);
    todoList.splice(todoIndex, 1);
    todoItemsContainerEl.removeChild(todoElement);
}

function createTodoList(todo) {
    let todoElement = document.createElement("li");
    todoElement.style.marginBottom = "10px";
    todoElement.classList.add("d-flex", "flex-row");
    todoElement.id = "todo" + todo.uniqueNo;

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row");
    labelContainer.classList.add("label-container");

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = "checkbox" + todo.uniqueNo;
    inputElement.classList.add("checkbox-input");



    let labelElement = document.createElement("label");
    labelElement.textContent = todo.userInputValue;
    labelElement.id = "label" + todo.uniqueNo;
    labelElement.htmlFor = "checkbox" + todo.uniqueNo;
    labelElement.classList.add("checkbox-label");

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
        inputElement.checked = true;
    } else {
        labelElement.classList.remove("checked");
        inputElement.isChecked = false;
    }

    inputElement.onclick = function() {
        onTodoStatusChange(labelElement.id, unique_no, todoElement.id);
    };

    let deleteIconContainerEl = document.createElement("div");
    deleteIconContainerEl.classList.add("delete-icon-container");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");
    deleteIcon.classList.add("delete-icon");

    deleteIconContainerEl.onclick = function() {
        removeTodoElement(todo);
    };

    deleteIconContainerEl.appendChild(deleteIcon);
    labelContainer.appendChild(labelElement);
    labelContainer.appendChild(deleteIconContainerEl);
    todoElement.appendChild(inputElement);
    todoElement.appendChild(labelContainer);
    todoElement.style.listStyle = "none";
    todoItemsContainerEl.appendChild(todoElement);
}

addTodoButtonEl.onclick = function() {
    let todoUserInputElValue = todoUserInputEl.value;
    if (todoUserInputElValue === "") {
        alert("Enter task:");
    } else {
        unique_no = unique_no + 1;

        let newtodo = {
            userInputValue: todoUserInputElValue,
            uniqueNo: unique_no,
            isChecked: false
        };

        createTodoList(newtodo);
        todoList.push(newtodo);


        todoUserInputEl.value = "";
    }
};

saveTodoButtonEl.onclick = function() {
    let stringifiedList = JSON.stringify(todoList);
    localStorage.setItem("todoList", stringifiedList);
};
for (let todo of todoList) {
    createTodoList(todo);
}
