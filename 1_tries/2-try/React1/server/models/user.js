import mongoose from 'mongoose';


let SchemaTypes = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  username:String,
  password:String,
  email:String,
  type:String
})

const User = mongoose.model("User",userSchema)

export default User;
