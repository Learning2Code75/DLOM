const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  userRole: String,
  id: String,
});

module.exports = mongoose.model("user", UserSchema);
