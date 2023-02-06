import express from "express";

import {
  updateBilling,
  createBilling,
  getBillings,
  getBilling,
} from "../controllers/billings.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
// router.patch("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);

router.get("/", getBillings);
router.get("/:dcid", getBilling);
router.post("/", createBilling);
router.patch("/:id", updateBilling);
// router.delete("/:id", deleteSubscription);

export default router;
