const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  testName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  rules: {
    type: Array,
    required: true,
  },
  outOfMarks: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
  assignedTo: {
    type: Array,
  },
  attempted: {
    type: Boolean,
    default: false,
  },
  answers: {
    type: Array,
    required: true,
  },
  submitBy: {
    type: Array,
  },
});

module.exports = mongoose.model("tests", TestSchema);
