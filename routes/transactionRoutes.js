import express from "express";
import { getTransactionsByUser, addTransaction } from "../controllers/transactionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getTransactionsByUser);
router.post("/", verifyToken, addTransaction);

export default router;
