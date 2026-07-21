require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection error:", err));

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

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});