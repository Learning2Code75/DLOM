import Billing from "../models/billing.js";
import mongoose from "mongoose";

export const getBillings = async (req, res) => {
  try {
    const bills = await Billing.find().populate([
      "dlom_client",
      "subscription",
    ]);
    res.status(200).json(bills);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createBilling = async (req, res) => {
  const bill = req.body;
  const newBill = new Billing(bill);
  try {
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateBilling = async (req, res) => {
  const { id: _id } = req.params;
  const bill = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No bill with that id");
  }

  try {
    const updatedBill = await Billing.findByIdAndUpdate(
      _id,
      { ...bill, _id },
      { new: true }
    );
    res.json(updatedBill);
  } catch (err) {
    console.log(err);
  }
};
