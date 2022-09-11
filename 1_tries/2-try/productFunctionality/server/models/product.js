import mongoose from "mongoose";

let SchemaTypes = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  prodSKU: { type: String, unique: true },
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
});

const Product = mongoose.model("Product", productSchema);

export default Product;
