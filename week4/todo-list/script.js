const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", function(){

    if(input.value==="") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = input.value;

    span.addEventListener("click", function(){
        span.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent="Delete";

    deleteBtn.addEventListener("click", function(){
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value="";

});