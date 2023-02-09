import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    homeNumber: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    products: [
      {
        name: { type: String, required: true },
        size: { type: String },
        taste: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        category: { type: String },
        img: { type: String },
        addedIngredients: { type: [String] },
        excludedIngredients: { type: [String] },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["active", "pending", "passive"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "online", "terminal"],
    },
    paymentReciver: { type: String },
    delivery: { type: Boolean, required: true },
    deliveryZone: { type: String, required: true, enum: ["A", "B", "C"] },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
