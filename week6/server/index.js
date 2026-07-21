require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection error:", err));

// Create a student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Search students by minimum age
app.get("/api/students/search", async (req, res) => {
  const students = await Student.find({
    age: { $gte: req.query.minAge }
  });

  res.json(students);
});

// Get one student by ID
app.get("/api/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(student);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});