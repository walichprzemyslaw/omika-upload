import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["pizza", "burgery","zapiekanki","sałatki"],
  },
  price: { type: [Number], required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Ingredient", IngredientSchema);
