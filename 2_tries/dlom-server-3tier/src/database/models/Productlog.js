const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let SchemaTypes = mongoose.Schema.Types;

const ProductlogSchema = new Schema(
  {
    product: { type: SchemaTypes.ObjectId, ref: "product" },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("productlog", ProductlogSchema);
