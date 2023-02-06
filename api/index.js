import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import productsRoute from "./routes/products.js";
import employeesRoute from "./routes/employees.js";
import ingredientsRoute from "./routes/ingredients.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongoose");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("hello from backend");
});

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/products", productsRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/ingredients", ingredientsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to server...");
});
