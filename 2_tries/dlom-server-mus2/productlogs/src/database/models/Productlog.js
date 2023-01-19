const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let SchemaTypes = mongoose.Schema.Types;

const ProductlogSchema = new Schema(
  {
    // product: { type: SchemaTypes.ObjectId, ref: "product" },
    product: {
      _id: { type: String, require: true },
      prodSKU: { type: String },
      prodName: String,
      productUnitRate: String,
      prodTax: String,
      prodDesc: [
        {
          title: { type: String },
          desc: { type: String },
        },
      ],
      prodImgUrl: String,
      qty: { type: Number, default: 0 },
      category: String,
      discount: String,
      createdAt: {
        type: Date,
        default: new Date(),
      },
      damaged: {
        type: String,
        default: "normal",
      },
      damagedDescription: {
        type: String,
        default: "",
      },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("productlog", ProductlogSchema);
