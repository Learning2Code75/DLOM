const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
});

module.exports = mongoose.model("product", ProductSchema);
