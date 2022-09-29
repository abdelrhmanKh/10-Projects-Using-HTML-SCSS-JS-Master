
const addBtn = document.querySelector(".add--btn")
const contianer = document.querySelector(".container")

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes && notes.length) {
    notes.forEach(text => {
        addNewNote(text)
    })
} else {

    addNewNote()
}


addBtn.addEventListener("click", () => {
    addNewNote()

})

function addNewNote(text = "") {

    const note = document.createElement("div")
    note.classList.add("container__note")

    note.innerHTML = `
        <div class="container__note__tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-circle-minus"></i></button>
        </div>
        <div class="container__note__main ${text ? "" : "hidden"}"></div>
        <textarea class="container__note__text ${text ? "hidden" : ""}"></textarea>
    `
    const editBtn = note.querySelector(".edit")
    const deleteBtn = note.querySelector(".delete")

    const textArea = note.querySelector(".container__note__text")
    const main = note.querySelector(".container__note__main")

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    })

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);
        updateLS()

    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLS()
    });

    contianer.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}