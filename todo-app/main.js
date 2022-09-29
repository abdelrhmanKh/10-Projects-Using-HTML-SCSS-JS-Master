// let lists = []
// let d = new Date();
// let ms = d.getMilliseconds();
// let sd = d.getSeconds();
// let add = document.querySelector('.add');
// let input = document.querySelector('.input');
// let tasksDiv = document.querySelector('.tasks');


// if (!localStorage.lists) {
//     localStorage.lists = '';
// }

// if (localStorage.getItem("lists")) {
//     lists = JSON.parse(localStorage.getItem("lists"))
// }

// if (lists.length) {
//     createList(lists);
// }

// add.addEventListener('click', () => {
//     if (input.value) {
//         lists = [...lists, {
//             id: Math.floor((Math.random() * ms * sd) * ms),
//             value: input.value,
//         }];
//         createList(lists);
//         localStorage.clear();
//         localStorage.setItem("lists", JSON.stringify(lists))
//     }

//     input.value = ""
// })

// function createList(lists) {
//     tasksDiv.innerHTML = "";
//     let ul = document.createElement("ul");
//     lists.forEach((e) => {
//         let li = document.createElement("li");
//         let spanText = document.createElement("span")
//         let spanDel = document.createElement("span")
//         li.id = e.id
//         spanText.classList.add("task")
//         spanText.textContent = e.value
//         spanDel.textContent = "delete"
//         spanDel.classList.add("del")
//         spanDel.addEventListener('click', delt)
//         li.append(spanText)
//         li.append(spanDel)
//         ul.appendChild(li)
//     })
//     tasksDiv.append(ul)
// }

// function delt(eldel) {
//     lists = lists.filter((e) => e.id == eldel.path[1].id ? '' : e)
//     createList(lists)
//     localStorage.clear();
//     localStorage.setItem("lists", JSON.stringify(lists))

// }

const todosUl = document.querySelector("ul")
const tasks = document.querySelector(".form")
const input = document.querySelector("input")

const todosLS = JSON.parse(localStorage.getItem("todo"))
if (todosLS) {
    todosLS.forEach(todoLS => {
        addTodo(todoLS)
    })

}

tasks.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo()
})
function addTodo(todo) {
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }
    if (todoText) {
        const todoEl = document.createElement("li")
        if (todo && todo.completed) {
            todoEl.classList.add("completed")
        }
        todoEl.innerText = todoText;
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS()
        })
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove()
            updateLS()
        })

        todosUl.appendChild(todoEl)
        updateLS()
        input.value = ""
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li")
    const todoObj = []

    todosEl.forEach(todoEl => {
        todoObj.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })

    localStorage.setItem("todo", JSON.stringify(todoObj))

}