import Productlog from "../models/productlog.js";
import mongoose from "mongoose";

export const getProductlogs = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const products = await Productlog.find().populate("product");

    // console.log(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createProductlog = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const prod = req.body;
  const newProduct = new Productlog(prod);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
