import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const trackingSchema = mongoose.Schema({
  operation_type: String,
  dlom_client: { type: SchemaTypes.ObjectId, ref: "DlomClient" },
});

const Tracking = mongoose.model("Tracking", trackingSchema);

export default Tracking;
