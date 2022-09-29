let lists = []
let d = new Date();
let ms = d.getMilliseconds();
let sd = d.getSeconds();
let add = document.querySelector('.add');
let input = document.querySelector('.input');
let tasksDiv = document.querySelector('.tasks');


if (!window.localStorage.lists) {
    window.localStorage.lists = '';
}

if (window.localStorage.getItem("lists")) {
    lists = JSON.parse(window.localStorage.getItem("lists"))
}

if (lists.length) {
    createList(lists);
}

add.addEventListener('click', () => {
    if (input.value) {
        lists = [...lists, {
            id: Math.floor((Math.random() * ms * sd) * ms),
            value: input.value,
        }];
        createList(lists);
        window.localStorage.clear();
        window.localStorage.setItem("lists", JSON.stringify(lists))
    }

    input.value = ""
})

function createList(lists) {
    tasksDiv.innerHTML = "";
    let ul = document.createElement("ul");
    lists.forEach((e) => {
        let li = document.createElement("li");
        let spanText = document.createElement("span")
        let spanDel = document.createElement("span")
        li.id = e.id
        spanText.classList.add("task")
        spanText.textContent = e.value
        spanDel.textContent = "delete"
        spanDel.classList.add("del")
        spanDel.addEventListener('click', delt)
        li.append(spanText)
        li.append(spanDel)
        ul.appendChild(li)
    })
    tasksDiv.append(ul)
}

function delt(eldel) {
    lists = lists.filter((e) => e.id == eldel.path[1].id ? '' : e)
    createList(lists)
    window.localStorage.clear();
    window.localStorage.setItem("lists", JSON.stringify(lists))

}