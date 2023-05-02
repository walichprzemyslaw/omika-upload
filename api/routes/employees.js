import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// GET ALL EMPLOYEES
router.get("/", verifyAdmin, getEmployees); 

// GET EMPLOYEE BY EMPLOYEE ID
router.get("/find/:id", verifyAdmin, getEmployee);

// CREATE EMPLOYEE
router.post("/", verifyAdmin, createEmployee);

// UPDATE EMPLOYEE
router.put("/:id", verifyAdmin, updateEmployee);

// DELETE EMPLOYEE
router.delete("/:id", verifyAdmin, deleteEmployee);
export default router;
