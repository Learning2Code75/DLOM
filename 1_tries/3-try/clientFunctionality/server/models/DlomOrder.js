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
    wareHouseReceipt: [{ imgString: String }],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DlomOrder", DlomOrderSchema);
