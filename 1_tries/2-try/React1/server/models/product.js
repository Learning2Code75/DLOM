import mongoose from 'mongoose';


let SchemaTypes = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  prodSSN: String,
  productUnitRate:String,
  prodTax:String,
  prodDesc:String
})

const Product = mongoose.model("Product",productSchema)

export default Product;
