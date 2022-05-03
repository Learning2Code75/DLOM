import mongoose from 'mongoose';


let SchemaTypes = mongoose.Schema.Types;

const clientSchema = mongoose.Schema({
  companyName:String,
  locationPin:String,
  state:String,
  gst:String,
  cin:String
})

const Client = mongoose.model("Client",clientSchema)

export default Client;
