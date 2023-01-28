import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true},
  desc: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["pizza", "burger", "zapiekanka","sałatka","dodatki","napoje"],
  },
  price: { type: [Number], required: true },
  ingredients: { type: [String], required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Product", ProductSchema);
