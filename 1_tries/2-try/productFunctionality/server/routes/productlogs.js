import express from "express";

import {
  getProductlogs,
  createProductlog,
} from "../controllers/productlogs.js";
import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
router.get("/", getProductlogs);
router.post("/", createProductlog);

export default router;
