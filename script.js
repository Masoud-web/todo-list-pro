let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask(){

    let input = document.getElementById("taskInput");

    let text = input.value.trim();

    if(text===""){

        alert("لطفاً یک کار وارد کنید.");

        return;

    }

    let task={

        id:Date.now(),

        title:text,

        completed:false,

        date:new Date().toLocaleString()

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    input.value="";

    input.focus();

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function renderTasks(){

    let list=document.getElementById("taskList");

    let empty=document.getElementById("emptyMessage");

    list.innerHTML="";

    if(tasks.length===0){

        empty.style.display="block";

        return;

    }

    empty.style.display="none";

    tasks.forEach(function(task){

        let li=document.createElement("li");

        li.className="task-item";

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <div class="task-info">

            <div class="task-title">${task.title}</div>

            <div class="task-date">${task.date}</div>

        </div>

        <div class="actions">

            <button
            class="done-btn"
            onclick="toggleTask(${task.id})">

            ✓

            </button>

            <button
            class="delete-btn"
            onclick="deleteTask(${task.id})">

            🗑

            </button>

        </div>

        `;

        list.appendChild(li);

    });

}
