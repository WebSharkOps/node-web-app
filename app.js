require("dotenv").config();

const express = require("express");
const fs = require("fs");
const app = express();

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('/var/log/node-web-app/app.log', `[${timestamp}] ${message}\n`);
}

// Log all incoming requests
app.use((req, res, next) => {
    log(`Request: ${req.method} ${req.url}`);
    next();
});

// Main route
app.get("/", (req, res) => {
  res.send("Hello from Bogdii’s Linux DevOps App!");
});


const port = process.env.PORT || 3000;
const hostname = process.env.HOST || '127.0.0.1';
app.listen(port, () => {
  log(`Express server started on port ${port}`);
  console.log(`App running on port ${port}`);
});


//Health probe

app.get("/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

//Crash testing
app.get("/crash-test", (req, res) => {
    log("Crash test triggered!");
    process.exit(1);
});
