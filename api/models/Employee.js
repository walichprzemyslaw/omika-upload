import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("Employee", EmployeeSchema);