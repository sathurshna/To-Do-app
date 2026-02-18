async function add() {

    const input = document.getElementById("input");

    if (input.value.trim() === "") return;

    await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: input.value })
    });

    input.value = "";
    loadTasks();
}

async function loadTasks() {

    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();

    const ul = document.getElementById("one");
    ul.innerHTML = "";

    data.forEach(task => {

        const li = document.createElement("li");
        li.textContent = task.task;

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-btn";

        btn.onclick = async function () {
            await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: "DELETE"
            });
            loadTasks();
        };

        li.appendChild(btn);
        ul.appendChild(li);
    });
}

loadTasks();

function deletefn(event) {
    event.target.parentNode.remove();
}

fetch("http://localhost:5000/api/users")
  .then(res => res.json())
  .then(data => {
    console.log("Data from backend:", data);
  })
  .catch(err => {
    console.error("Error:", err);
  });

