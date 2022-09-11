// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const DlomClientSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  contactPersonName: {
    type: String,
  },
  address: {
    type: String,
  },
  gst: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  discountRate: {
    type: String,
  },
  salesPersonAssigned: {
    type: String,
  },
  clientSocialMedia: [{ title: String, link: String }],
  typeOfCustomer: {
    type: String,
  },
});

module.exports = mongoose.model("DlomClient", DlomClientSchema);
