import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const billingSchema = mongoose.Schema({
  dlom_client: { type: SchemaTypes.ObjectId, ref: "DlomClient" },
  subscription: { type: SchemaTypes.ObjectId, ref: "Subscription" },
  timestamp: String,
  payments: [
    {
      amount: String,
      description: String,
      mode: String,
      timestamp: String,
    },
  ],
});

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
