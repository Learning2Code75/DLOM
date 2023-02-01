import express from "express";

import { getTrackings, createTracking } from "../controllers/trackings.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
// router.patch("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);

router.get("/", getTrackings);
router.post("/", createTracking);

export default router;
