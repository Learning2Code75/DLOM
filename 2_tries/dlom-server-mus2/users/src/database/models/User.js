const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  userRole: String,
  id: String,
  dlom_client: { type: String, default: "63de75f59d3cfd5b0c1d6cca" },
});

module.exports = mongoose.model("user", UserSchema);
