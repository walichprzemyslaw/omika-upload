import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        size: { type: String },
        additionalIngredients: { type: [String] },
        excludedIngredients: { type: [String] },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    payment: [
      {
        method: { type: String, required: true, enum:["cash","online","terminal"] },
        employeeId: { type: String },
      },
    ],
    delivery: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);