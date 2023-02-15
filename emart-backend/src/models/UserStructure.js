const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    profileImage: String,
  },
  { collection: "users" }
);

let UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
