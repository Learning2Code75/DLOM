import express from "express";

import {
  deleteDlomClient,
  updateDlomClient,
  createDlomClient,
  getDlomClients,
  getDlomClient,
} from "../controllers/dlomclients.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
// localhost:5000/products/
// router.get("/", auth, getProducts);
// router.post("/", auth, createProduct);
// router.patch("/:id", auth, updateProduct);
// router.delete("/:id", auth, deleteProduct);

router.get("/", getDlomClients);
router.get("/:id", getDlomClient);
router.post("/", createDlomClient);
router.patch("/:id", updateDlomClient);
router.delete("/:id", deleteDlomClient);

export default router;
