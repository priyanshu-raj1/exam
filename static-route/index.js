const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
        });
    } else if (req.url.endsWith(".css")) {
        fs.readFile(path.join(__dirname, "css", req.url), "utf-8", (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(content);
        });
    } else if (req.url.endsWith(".js")) {
        fs.readFile(path.join(__dirname, "js", req.url), "utf-8", (err, content) => { 
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(content);
        });
    } else if (req.url.endsWith(".png") || req.url.endsWith(".jpg") || req.url.endsWith(".jpeg")) {
        fs.readFile(path.join(__dirname, "images", req.url), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "image/png" });
            res.end(content);
        });
    }
});



server.listen(3000, () => console.log("Server running..."));