const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// MySQL connection
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

// GET all tasks
app.get("/tasks", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.json(result);
        }
    });

});


// ADD task
app.post("/tasks", (req, res) => {
    const { task } = req.body;
    db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err, result) => {
        if (err) return res.send(err);
        res.json({ message: "Task added" });
    });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
        if (err) return res.send(err);
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

