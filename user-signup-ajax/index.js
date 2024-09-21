const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        res.status(409).json({ success: false, message: "Username already exists" });
    } else {
        users.push({ username, password });
        fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users));
        res.status(201).json({ success: true, message: "User created successfully" });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});