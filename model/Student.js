const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  profileInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  attemptedTest:{
    type: Array,
  },
  attemptedTestData:{
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model user with UserSchema
module.exports = mongoose.model("students", StudentSchema);
