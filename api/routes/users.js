import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyUser, updateUser);

// DELETE USER
router.delete("/:id", verifyUser, deleteUser);

// GET USER BY ID
router.get("/find/:id", verifyUser, getUser);

// GET USERS
router.get("/", verifyAdmin, getUsers);

export default router;
