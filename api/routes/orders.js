import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrdersByUser,
  getOrdersByDate,
  getOrdersByStatus,
  updateOrder,
} from "../controllers/order.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL ORDERS
router.get("/", verifyAdmin, getOrders);

// GET ORDER BY ORDER ID
router.get("/find/:id", getOrder);

//GET ORDERS BY DATE
router.get("/day/:day/:month/:year", getOrdersByDate)

//GET ORDERS BY STATUS
router.get("/today/:day/:month/:year/:status", getOrdersByStatus)

// GET ORDERS BY USER ID
router.get("/user/:id", getOrdersByUser)

// CREATE ORDER
router.post("/", createOrder);

// UPDATE ORDER
router.put("/:id", verifyAdmin, updateOrder);  

// DELETE ORDER
router.delete("/:id", verifyAdmin, deleteOrder);

export default router;
