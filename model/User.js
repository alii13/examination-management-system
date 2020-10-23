const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  className: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model user with UserSchema
module.exports = mongoose.model("users", UserSchema);
