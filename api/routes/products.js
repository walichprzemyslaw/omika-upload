import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCT BY PRODUCT ID
router.get("/find/:id", getProduct);

// CREATE PRODUCT
router.post("/", verifyAdmin, createProduct); 

// UPDATE PRODUCT
router.put("/:id", verifyAdmin, updateProduct);

// DELETE PRODUCT
router.delete("/:id", verifyAdmin, deleteProduct);
export default router;
