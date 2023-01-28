import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["pizza", "burger"],
  },
  price: { type: [Number], required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Ingredient", IngredientSchema);
