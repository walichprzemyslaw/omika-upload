import mongoose from "mongoose"; 

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: Number, required: true },
    // products: [
    //   {
    //     name: { type: String, required: true },
    //     size: { type: String },
    //     price: { type : Number },
    //     additionalIngredients: { type: [String] },
    //     excludedIngredients: { type: [String] },
    //   },
    // ],
    orderedProducts: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum:["active","pending","passive"] }, 
    paymentMethod: {type: String, required: true, enum:["cash","online","terminal"]},
    paymentReciver: {type: String, required: true},
    delivery: { type: Boolean, required: true }, 
    deliveryAddress: { type: String },
    deliveryTown: { type: String },
    deliveryZone: { type: String, required: true, enum: ["A", "B", "C"] },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);