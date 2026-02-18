// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    fetch("http://localhost:5000/tasks")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.title + " - " + task.description;

                const btn = document.createElement("button");
                btn.textContent = " Delete";

                btn.onclick = function () {
                    fetch(`http://localhost:5000/tasks/${task.id}`, {
                        method: "DELETE"
                    }).then(() => loadTasks());
                };

                li.appendChild(btn);
                list.appendChild(li);
            });
        });
}

// Add new task
document.getElementById("taskForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;

    fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, deadline })
    })
    .then(() => {
        this.reset();
        loadTasks();
    });
});
