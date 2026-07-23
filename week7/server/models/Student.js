const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true }, // e.g. "10th", "BSCS-3A"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
