// Seleção de elementos
const  toDoForm = document.querySelector("#toDo-form");
const  toDoInput = document.querySelector("#toDo-input");
const  toDoList = document.querySelector("#toDo-list");
const  editForm = document.querySelector("#edit-form");
const  editInput = document.querySelector("#edit-input");
const  cancelEditButton = document.querySelector("#cancel-edit-button");

let oldInputValue;

// Funções
const saveToDo = (text) => {

    const toDo = document.createElement("div");
    toDo.classList.add("toDo");

    const toDoTitle = document.createElement("h3");
    toDoTitle.innerText = text;
    toDo.appendChild(toDoTitle);

    const doneButton = document.createElement("button");
    doneButton.classList.add("finish-toDo")
    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDo.appendChild(doneButton);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-toDo")
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'
    toDo.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("remove-toDo")
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDo.appendChild(deleteButton);

    toDoList.appendChild(toDo);

    toDoInput.value = "";
    toDoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide")
    toDoForm.classList.toggle("hide")
    toDoList.classList.toggle("hide")
};

const updateToDo = (text) => {
    const toDos = document.querySelectorAll(".toDo");

    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector("h3");

        if (toDoTitle.innerText === oldInputValue) {
            toDoTitle.innerText = text;
        }
    });
    };
// Eventos
toDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = toDoInput.value

    if (inputValue) {
        saveToDo(inputValue)
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div");
    let toDoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        toDoTitle = parentEl.querySelector("h3").innerText;
    }
    
    if(targetEl.classList.contains("finish-toDo")) {
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-toDo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-toDo")) {
        toggleForms();

        editInput.value = toDoTitle
        oldInputValue = toDoTitle
    }
});

cancelEditButton.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateToDo(editInputValue)
    }

    toggleForms()
})