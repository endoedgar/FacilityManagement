const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, index: true },
  bio: { type: String, maxlength: 101 },
  groups: [String]
});

module.exports = mongoose.model("User", userSchema);
