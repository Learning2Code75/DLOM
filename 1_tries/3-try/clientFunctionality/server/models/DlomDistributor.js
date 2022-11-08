// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const DlomDistributorSchema = new mongoose.Schema({
  companyName: {
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
  accountNumber: {
    type: String,
  },
  bankIfsc: {
    type: String,
  },
  socialMedia: [{ title: String, link: String }],
});

module.exports = mongoose.model("DlomDistributor", DlomDistributorSchema);
