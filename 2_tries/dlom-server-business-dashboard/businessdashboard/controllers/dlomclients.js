import DlomClient from "../models/dlomclient.js";
import mongoose from "mongoose";

export const getDlomClients = async (req, res) => {
  try {
    const dlomclients = await DlomClient.find().populate("subscription");
    res.status(200).json(dlomclients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getDlomClient = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const dlomclient = await DlomClient.findById(_id).populate("subscription");
    res.status(200).json(dlomclient);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const createDlomClient = async (req, res) => {
  const dc = req.body;
  const newDlomClient = new DlomClient(dc);
  try {
    await newDlomClient.save();
    res.status(201).json(newDlomClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateDlomClient = async (req, res) => {
  const { id: _id } = req.params;
  const dc = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Dlom Client with that id");
  }

  try {
    const updatedDlomClient = await DlomClient.findByIdAndUpdate(
      _id,
      { ...dc, _id },
      { new: true }
    ).populate("subscription");
    res.json(updatedDlomClient);
  } catch (err) {
    console.log(err);
  }
};

export const deleteDlomClient = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No dlom client with that id");
  }

  await DlomClient.findByIdAndRemove(_id);

  res.json({ message: "Dlom Client deleted successfully" });
};
