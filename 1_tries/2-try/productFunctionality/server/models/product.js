import mongoose from 'mongoose';


let SchemaTypes = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
  prodSSN: {type:String,unique:true},
  prodName:String,
  productUnitRate:String,
  prodTax:String,
  prodDesc:[String],
  prodImgUrl:[String],
  qty:{type:Number,default:0},
  createdAt:{
    type: Date,
    default : new Date()
  }
})

const Product = mongoose.model("Product",productSchema)

export default Product;
