import Orderlog from "../models/orderlog.js";
import mongoose from "mongoose";

export const getOrderlogs = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const orderlogs = await Orderlog.find();

    // console.log(products);

    res.status(200).json(orderlogs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createOrderlog = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const ordlog = req.body;
  const newOrderlog = new Orderlog(ordlog);

  try {
    await newOrderlog.save();
    res.status(201).json(newOrderlog);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
