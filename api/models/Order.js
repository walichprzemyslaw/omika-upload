import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    street: { type: String },
    homeNumber: { type: String },
    city: { type: String },
    phone: { type: Number, required: true },
    products: [
      {
        name: { type: String, required: true },
        size: { type: String },
        taste: { type: String },
        crust: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        category: { type: String },
        img: { type: String },
        addedIngredients: { type: [String] },
        excludedIngredients: { type: [String] },
        firstHalf: {
          name: { type: String },
          addedIngredients: { type: [String] },
          excludedIngredients: { type: [String] },
        },
        secondHalf: {
          name: { type: String },
          addedIngredients2: { type: [String] },
          excludedIngredients2: { type: [String] },
        },
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
    deliveryTime: { type: String, required: true},
    comments: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
