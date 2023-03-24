import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    street: { type: String },
    homeNumber: { type: String },
    city: { type: String },
    phone: { type: Number },
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
    deliveryCost: { type: Number },
    tip: { type: Number },
    tipAmount: { type: Number },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "preparation", "ready", "delivered", "cancelled"],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "online", "terminal"],
    },
    paymentReciver: { type: String },
    delivery: { type: Boolean, required: true },
    deliveryTime: { type: String, required: true },
    comments: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
