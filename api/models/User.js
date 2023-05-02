import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    homeNumber: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
