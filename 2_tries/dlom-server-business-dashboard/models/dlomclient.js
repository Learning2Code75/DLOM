import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const dlomClientSchema = mongoose.Schema({
  tracking: {
    CliOps: Number,
    UserOps: Number,
    ProdOps: Number,
    OrderOps: Number,
    TaskOps: Number,
  },
  carryForward: {
    CliOps: { type: Number, default: 0 },
    UserOps: { type: Number, default: 0 },
    ProdOps: { type: Number, default: 0 },
    OrderOps: { type: Number, default: 0 },
    TaskOps: { type: Number, default: 0 },
  },
  companyName: String,
  locationPin: String,
  state: String,
  cin: String,
  gst: String,
  address: String,
  phone: String,
  desc: String,
  subscription: { type: SchemaTypes.ObjectId, ref: "Subscription" },
  operations: {
    CliOps: { type: String, default: "allowed" },
    UserOps: { type: String, default: "allowed" },
    ProdOps: { type: String, default: "allowed" },
    OrderOps: { type: String, default: "allowed" },
    TaskOps: { type: String, default: "allowed" },
  },
});

const DlomClient = mongoose.model("DlomClient", dlomClientSchema);

export default DlomClient;
