import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const products = await Product.find();

    console.log(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const prod = req.body;
  const newProduct = new Product(prod);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  // console.log(req.params)
  // console.log(req.body)
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const { id: _id } = req.params;
  const prod = req.body;
  // console.log(prod)

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No product with that id");
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { ...prod, _id },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No product with that id");
  }

  await Product.findByIdAndRemove(_id);

  res.json({ message: "Product deleted successfully" });

  // console.log(_id);
};
