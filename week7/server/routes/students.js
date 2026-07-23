const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: "i" }; // case-insensitive partial match
    }
    if (req.query.grade) {
      filter.grade = req.query.grade;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found." });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age, email, phoneNumber, grade } = req.body;
    if (!name || !age || !email || !phoneNumber || !grade) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newStudent = new Student({name, age, email, phoneNumber, grade,});
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: "Error creating student", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Student not found." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating student", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found." });
    res.json({ message: "Student deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
