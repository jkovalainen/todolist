//Muuttujat
const todoInput = document.querySelector(".todo-input")

const todoList = document.querySelector(".todo-list")

const todoButton = document.querySelector(".todo-button")

const filterOption = document.querySelector(".filter-todo")

//Event listeners


todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);



function addTodo(event){
    event.preventDefault();
   
    const todoDiv = document.createElement('div');

    todoDiv.classList.add("todo");
  
   

    const newTodo = document.createElement("li");
    // Tarkistetaan että syötetty tehtävä on sopivan kokoinen
    if (todoInput.value === "" || todoInput.value === null) {
        alert("Kirjoita tehtävä!") 
        todoInput.value = "";
        return false;
       
    }
    if (todoInput.value.length > 15) {
        alert("Tehtävä on liian pitkä!") 
        todoInput.value = "";
        return false;
    }

    newTodo.innerText = todoInput.value;
  
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value)

    //Nappi suoritetulle tehtäville
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    //Nappi tehtävän poistoon
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-ban"></i>'
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //Lisätään tehtävä listaan
    todoList.appendChild(todoDiv);

    //Tyhjennetään syöttökenttä lisäyksen jälkeen
    todoInput.value = "";

    


}





    


function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] == 'delete-button'){

        const todo = item.parentElement;
        todo.classList.add('removed');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
        
    }
    
    if(item.classList[0] == 'check-button')
    {
        const todo = item.parentElement;
        todo.classList.toggle("done");

    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "done":
                if(todo.classList.contains("done")) {

                    todo.style.display = "flex";

                } else {

                    todo.style.display = "none";

                }
                break;

            case "uncompleted":
                 if(!todo.classList.contains("done")) {
    
                        todo.style.display = "flex";
    
                 } else {
    
                        todo.style.display = "none";
    
                  }
                break;
           
        }
    });

}


//Tallennus localstorageen

function saveLocal(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
 }


 //Tehtävien palauttaminen localstoragesta
 function getTodos(){
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-ban"></i>'
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);

        });

     }
}

//Tehtävien poisto delete napilla localstoragesta
function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Haetaan poistettavan tehtävän tallennettu indexi ja poistetaan sitä vastaava tehtävä
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos));

}
