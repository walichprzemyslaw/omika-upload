import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  getByCategory
} from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET PRODUCT BY PRODUCT ID
router.get("/find/:id", getProduct);

// GET PRODUCTS BY CATEGORY
router.get("/category/:id", getByCategory);

// CREATE PRODUCT
router.post("/", verifyAdmin, createProduct); 

// UPDATE PRODUCT
router.put("/:id", verifyAdmin, updateProduct);

// DELETE PRODUCT
router.delete("/:id", verifyAdmin, deleteProduct);
export default router;
