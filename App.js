import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import pricingRoutes from "./routes/pricing.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
