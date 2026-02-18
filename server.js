const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "todoapp"
});


db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/tasks", (req, res) => {
    connection.query("SELECT * FROM tasks", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.post("/add-task", (req, res) => {
    const { title, description, deadline } = req.body;

    const sql = "INSERT INTO tasks (title, description, due_date, status, priority, created_at) VALUES (?, ?, ?, 'Pending', 'Medium', NOW())";

    connection.query(sql, [title, description, deadline], (err, result) => {
        if (err) throw err;
        res.json({ message: "Task added" });
    });
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;

    connection.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Task deleted" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});


app.use(cors());

//now your backend has an API endpoint.
app.get("/api/todos", (req, res) => {
    res.json([
        { id: 1, task: "Learn Full Stack" },
        { id: 2, task: "Build Project" }
    ]);
});

