import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const productlogSchema = mongoose.Schema({
  product: { type: SchemaTypes.ObjectId, ref: "Product" },
  timestamp: {
    type: Date,
    default: new Date(),
  },
  operation: {
    type: String,
    default: "",
  },
  qty: {
    type: Number,
    default: 0,
  },
  damagedDescription: {
    type: String,
    default: "",
  },
});

const Productlog = mongoose.model("Productlog", productlogSchema);

export default Productlog;
