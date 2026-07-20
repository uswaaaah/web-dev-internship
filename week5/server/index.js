const express = require("express");
const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.send("Hello from my first server!");
});

// About route
app.get("/about", (req, res) => {
  res.send("This is the About page.");
});

// Students route
app.get("/students", (req, res) => {
  res.send("List of students would go here.");
});

// Route parameter
app.get("/students/:id", (req, res) => {
  res.send(`Student ID requested: ${req.params.id}`);
});

// Query parameter
app.get("/search", (req, res) => {
  res.send(`Searching for: ${req.query.name}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});