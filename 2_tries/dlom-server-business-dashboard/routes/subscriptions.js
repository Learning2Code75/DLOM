import express from "express";

import {
  deleteSubscription,
  updateSubscription,
  createSubscription,
  getSubscriptions,
} from "../controllers/subscriptions.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
// router.patch("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);

router.get("/", getSubscriptions);
router.post("/", createSubscription);
router.patch("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
