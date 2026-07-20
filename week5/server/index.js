const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

let students = [
  { id: 1, name: "Ali", age: 21 },
  { id: 2, name: "Sara", age: 20 },
];

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

app.get("/api/student", (req, res) => {
  res.json({
    name: "Ali",
    age: 21,
    isStudent: true
  });
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === parseInt(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Not found"
    });
  }

  res.json(student);
});

app.post("/api/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({
      message: "Not found"
    });
  }

  student.name = req.body.name ?? student.name;
  student.age = req.body.age ?? student.age;

  res.json(student);
});

app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex(
    s => s.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Not found"
    });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});