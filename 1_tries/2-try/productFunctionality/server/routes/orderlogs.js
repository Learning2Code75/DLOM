import express from "express";

import { getOrderlogs, createOrderlog } from "../controllers/orderlogs.js";
import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
router.get("/", getOrderlogs);
router.post("/", createOrderlog);

export default router;
