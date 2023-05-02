import express from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredients,
  updateIngredient,
  getByCategory
} from "../controllers/Ingredient.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL Ingredients
router.get("/", getIngredients);

// GET Ingredient BY Ingredient ID
router.get("/find/:id", getIngredient);

// GET Ingredient by category
router.get("/category/:id/:list", getByCategory);

// CREATE Ingredient
router.post("/", verifyAdmin, createIngredient); 

// UPDATE Ingredient
router.put("/:id", verifyAdmin, updateIngredient);

// DELETE Ingredient
router.delete("/:id", verifyAdmin, deleteIngredient);
export default router;