import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["pizza", "burgery","zapiekanki","sałatki","sosy","napoje"],
  },
  price: { type: [Number] },
  isAvailable: { type: Boolean, default: true },
  isAvailableSmall: { type: Boolean},
  isAvailableMedium: { type: Boolean},
  isAvailableLarge: { type: Boolean},
});

export default mongoose.model("Ingredient", IngredientSchema);
