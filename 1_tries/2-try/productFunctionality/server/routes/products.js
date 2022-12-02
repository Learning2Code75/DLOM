import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
// router.patch("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);
router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
