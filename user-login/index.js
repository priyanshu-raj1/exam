const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid username or password" });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});