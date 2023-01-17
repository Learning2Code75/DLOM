const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderlogSchema = new Schema(
  {
    order: {
      client: {
        id: String,
        companyName: String,
        contactPersonName: String,
      },
      salesperson: {
        type: String,
      },
      salesOrder: {
        distributorName: String,
        distributorDetails: String,
        voucherNo: String,
        dated: String,
        modeTermsOfPayment: String,
        buyerRefOrderNo: String,
        otherRef: String,
        invoiceTo: String,
        despatchThrough: String,
        destination: String,
        termsOfDelivery: String,
        soTable: [
          {
            siNo: Number,
            descriptionOfGoods: String,
            dueOn: String,
            qty: Number,
            rate: String,
            per: String,
            amount: String,
          },
        ],
        totalQty: Number,
        totalAmt: String,
        amtInWords: String,
      },
      invoice: {
        distributorName: String,
        distributorDetails: String,
        invoiceNo: String,
        dated: String,
        deliveryNote: String,
        supplierRef: String,
        otherRef: String,
        client: String,
        despatchDocNo: String,
        deliveryNoteDate: String,
        despatchedThrough: String,
        destination: String,
        invTable: [
          {
            siNo: Number,
            descriptionOfGoods: String,
            hsnSAC: String,
            GSTRate: String,
            qty: Number,
            rate: String,
            per: String,
            amount: String,
          },
        ],
        totalQty: Number,
        totalAmount: String,
        amtChargableInWords: String,
        invTaxTable: [
          {
            hsnSAC: String,
            taxableValue: String,
            centralTaxRate: String,
            centralTaxAmt: String,
            stateTaxRate: String,
            stateTaxAmt: String,
          },
        ],
        totalTaxableValue: String,
        totalCentralTaxAmt: String,
        totalStateTaxAmt: String,
        taxAmtInWords: String,
        companyPAN: String,
        companyBankDetails: {
          bankName: String,
          acNo: String,
          BranchIFSCode: String,
        },
        for: String,
      },
      wareHouseReceipt: [{ imgString: String }],
      salesReceipt: {
        distributorName: String,
        distributorDetails: String,
        soldBy: String,
        date: String,
        name: String,
        address: String,
        mode: String,
        srTable: [
          {
            qty: Number,
            details: String,
            price: String,
            amount: String,
          },
        ],
      },
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

    operation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderlog", OrderlogSchema);
