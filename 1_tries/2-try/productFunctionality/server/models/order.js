import mongoose from 'mongoose';


let SchemaTypes = mongoose.Schema.Types;

const orderSchema = mongoose.Schema({
  userId:mongoose.ObjectId,
  clientId:mongoose.ObjectId,
  deliveryStatus:String,
  paymentStatus:String,
  paymentAmountDue:String,
  orderCreatedAt:{
    type:Date,
    default: new Date()
  },
  orderSalesOrder:{
    distributor:mongoose.ObjectId,
    invoiceTo:mongoose.ObjectId,
    date:String,
    soNumber:String,
    modePayment:String,
    buyerRef:String,
    otherRef:String,
    despatchThrough:String,
    destination:String,
    termsOfDelivery:String,
    products:[{prodRef:mongoose.ObjectId,salesPrice:String,qty:Number,amt:String}],
    totalQty:Number,
    totalPrice:String,
    amtInWords:String,
  },
  orderInvoice:{
    distributor:mongoose.ObjectId,
    buyer:mongoose.ObjectId,
    invoiceNo:String,
    date:String,
    deliveryNote:String,
    supplierRef:String,
    despatchDocNo:String,
    deliveryNoteDate:String,
    despatchedThrough:String,
    destination:String,

    proposedProducts:[{prodRef:mongoose.ObjectId,salesPrice:String,qty:Number,taxP:String,amtAfterTax:String}],
    totalQty:Number,
    totalPriceBefTax:String,
    totalTax:String,
    taxInWords:String,

    totalPriceAftTax:String,
    amtInWords:String,

    distributorBank:{
      name:String,
      acno:String,
      branchIFS:String
    },

  },
  orderWarehouseReceipt:mongoose.ObjectId,
  orderPaymentInput:[String],
  orderSalesReceipt:mongoose.ObjectId
})

const Order = mongoose.model("Order",orderSchema)

export default Order;
