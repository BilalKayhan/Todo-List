let todo;
const containerElement = document.querySelector(".container");
const inputElement = document.getElementById("todoList");

const addButton = document.querySelector("#add");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");

const ulElement = document.querySelector(".card-body>ul.list-group");

addButton.addEventListener("click", () => {
    let value = inputElement.value;
    if(!value){
        alert("Kayıt alanı boş bırakılamaz");
        return;
    }
    if(localStorage.getItem("todo") === null){
        todo = []; 
    }else{
        todo = JSON.parse(localStorage.getItem("todo"));
    }
    if(todo.includes(value)){
        alert("Girilen değer daha önce tanımlanmış...");
    }else{
        todo.push(value);
    }
    
    localStorage.setItem("todo",JSON.stringify(todo));
    inputElement.value = "";
    inputElement.focus(); 
    createList();
})

const createList = () => {
    let newList = JSON.parse(localStorage.getItem("todo"));
    ulElement.innerHTML = "";
    newList.forEach((element) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        liElement.innerHTML= element;
        liElement.addEventListener("click", () => {
            inputElement.value =liElement.textContent
        })
        ulElement.prepend(liElement);
    });
}
createList();

deleteButton.addEventListener("click", () => {
    const newList = JSON.parse(localStorage.getItem("todo"));
    newList.forEach((item,index) => {
        if(item === inputElement.value){
            newList.splice(index,1);
        }
    })
    localStorage.setItem("todo",JSON.stringify(newList));
    inputElement.value = "";
    inputElement.focus;
    createList();
})

clearButton.addEventListener("click", () => {
    localStorage.clear();
    createList();
})