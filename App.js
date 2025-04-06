import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import stockRoutes from './routes/stockRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
