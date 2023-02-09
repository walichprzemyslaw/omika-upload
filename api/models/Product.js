import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true},
  desc: { type: String },
  category: {
    type: String,
    required: true,
    enum: ["pizza", "burgery", "zapiekanki","sałatki","dodatki"],
  },
  price: { type: [Number], required: true },
  ingredients: { type: [String], required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Product", ProductSchema);
