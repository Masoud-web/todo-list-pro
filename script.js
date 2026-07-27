<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لیست کارها</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Tahoma, Arial, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: #fff;
            width: 100%;
            max-width: 480px;
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        .header {
            background: #5a67d8;
            color: white;
            padding: 25px 20px;
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .input-section {
            display: flex;
            padding: 20px;
            gap: 10px;
            background: #f7fafc;
            border-bottom: 1px solid #e2e8f0;
        }

        #taskInput {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 15px;
            outline: none;
            transition: border-color 0.2s;
        }

        #taskInput:focus {
            border-color: #5a67d8;
        }

        .add-btn {
            background: #5a67d8;
            color: white;
            border: none;
            padding: 0 20px;
            border-radius: 10px;
            font-size: 15px;
            cursor: pointer;
            transition: background 0.2s;
        }

        .add-btn:hover {
            background: #4c51bf;
        }

        #taskList {
            list-style: none;
            max-height: 400px;
            overflow-y: auto;
        }

        .task-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #edf2f7;
            transition: background 0.2s;
        }

        .task-item:hover {
            background: #f7fafc;
        }

        .task-item.completed .task-title {
            text-decoration: line-through;
            color: #a0aec0;
        }

        .task-info {
            flex: 1;
            margin-left: 15px;
        }

        .task-title {
            font-size: 16px;
            color: #2d3748;
            margin-bottom: 4px;
            word-break: break-word;
        }

        .task-date {
            font-size: 12px;
            color: #a0aec0;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .done-btn,
        .delete-btn {
            width: 36px;
            height: 36px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .done-btn {
            background: #c6f6d5;
            color: #276749;
        }

        .done-btn:hover {
            background: #9ae6b4;
        }

        .delete-btn {
            background: #fed7d7;
            color: #c53030;
        }

        .delete-btn:hover {
            background: #feb2b2;
        }

        #emptyMessage {
            text-align: center;
            padding: 40px 20px;
            color: #a0aec0;
            font-size: 15px;
            display: none;
        }

        .footer {
            text-align: center;
            padding: 15px;
            font-size: 13px;
            color: #a0aec0;
            background: #f7fafc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>لیست کارها</h1>
            <p>کارهای امروزت رو مدیریت کن</p>
        </div>

        <div class="input-section">
            <input type="text" id="taskInput" placeholder="کار جدید بنویس..." onkeypress="if(event.key==='Enter') addTask()">
            <button class="add-btn" onclick="addTask()">افزودن</button>
        </div>

        <ul id="taskList"></ul>
        <div id="emptyMessage">هیچ کاری وجود ندارد ✨</div>

        <div class="footer">
            داده‌ها در مرورگر شما ذخیره می‌شوند
        </div>
    </div>

    <script>
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        renderTasks();

        function addTask() {
            let input = document.getElementById("taskInput");
            let text = input.value.trim();

            if (text === "") {
                alert("لطفاً یک کار وارد کنید.");
                return;
            }

            let task = {
                id: Date.now(),
                title: text,
                completed: false,
                date: new Date().toLocaleString("fa-IR")
            };

            tasks.push(task);
            saveTasks();
            renderTasks();

            input.value = "";
            input.focus();
        }

        function saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function toggleTask(id) {
            tasks = tasks.map(task => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            saveTasks();
            renderTasks();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }

        function renderTasks() {
            let list = document.getElementById("taskList");
            let empty = document.getElementById("emptyMessage");

            list.innerHTML = "";

            if (tasks.length === 0) {
                empty.style.display = "block";
                return;
            }

            empty.style.display = "none";

            tasks.forEach(function (task) {
                let li = document.createElement("li");
                li.className = "task-item";

                if (task.completed) {
                    li.classList.add("completed");
                }

                li.innerHTML = `
                    <div class="task-info">
                        <div class="task-title">${task.title}</div>
                        <div class="task-date">${task.date}</div>
                    </div>
                    <div class="actions">
                        <button class="done-btn" onclick="toggleTask(${task.id})">✓</button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
                    </div>
                `;

                list.appendChild(li);
            });
        }
    </script>
</body>
</html>
