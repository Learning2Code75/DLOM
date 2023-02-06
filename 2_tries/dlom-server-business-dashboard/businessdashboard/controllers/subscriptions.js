import Subscription from "../models/subscription.js";
import mongoose from "mongoose";

export const getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find();
    res.status(200).json(subs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createSubscription = async (req, res) => {
  const sub = req.body;
  const newSub = new Subscription(sub);
  try {
    await newSub.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateSubscription = async (req, res) => {
  const { id: _id } = req.params;
  const sub = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No subscription with that id");
  }

  try {
    const updatedSub = await Subscription.findByIdAndUpdate(
      _id,
      { ...sub, _id },
      { new: true }
    );
    res.json(updatedSub);
  } catch (err) {
    console.log(err);
  }
};

export const deleteSubscription = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No subscription with that id");
  }

  await Subscription.findByIdAndRemove(_id);

  res.json({ message: "Subscription deleted successfully" });
};
