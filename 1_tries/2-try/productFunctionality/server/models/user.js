import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userRole: String,
  id: String,
});

const User = mongoose.model("User", userSchema);

export default User;
