const mongoose = require("mongoose");

const DlomOrderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DlomClient",
    },
    salesperson: {
      type: String,
    },
    salesOrder: {},
    invoice: {},
    wareHouseReceipt: {
      img1: String,
      img2: String,
    },
    salesReceipt: {},

    orderDelivery: {
      history: [{ timeStamp: String, status: String }],
    },
    orderCancel: {
      timeStamp: String,
      state: String,
      desc: String,
    },
    orderPayment: {
      history: [
        {
          timeStamp: String,
          amount: String,
          method: String,
          description: String,
        },
      ],
    },
    distributorDetails: {
      name: String,
      address: String,
      logo: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DlomOrder", DlomOrderSchema);
