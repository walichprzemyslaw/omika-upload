import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  deliveryZone: { type: String, required: true, enum: ["A", "B", "C"] },
  phone: { type: String, required: true },
});

export default mongoose.model("Customer", CustomerSchema);
