import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getOrdersByCustomerId,
  updateCustomer,
} from "../controllers/customer.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL CUSTOMERS
router.get("/", verifyAdmin, getCustomers);

// GET CUSTOMER BY CUSTOMER ID
router.get("/find/:id", verifyUser, getCustomer);

// GET ORDERS BY CUSTOMER ID
router.get("/customer/:id", verifyUser, getOrdersByCustomerId);

// CREATE CUSTOMER
router.post("/", createCustomer);

// UPDATE CUSTOMER
router.put("/:id", verifyUser, updateCustomer);

// DELETE CUSTOMER
router.delete("/:id", verifyUser, deleteCustomer); 
export default router;
