import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const subscriptionSchema = mongoose.Schema({
  tracking: {
    CliOps: Number,
    UserOps: Number,
    ProdOps: Number,
    OrderOps: Number,
    TaskOps: Number,
  },
  cost: String,
  costPer: String,
  status: String,
  name: String,
  description: String,
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
