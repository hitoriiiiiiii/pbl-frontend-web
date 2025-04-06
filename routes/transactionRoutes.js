import express from "express";
import { getTransactions, addTransaction } from "../controllers/transactionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getTransactions);
router.post("/", verifyToken, addTransaction);

export default router;
