import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Importing routes
import authRoutes from "./routes/authRoutes.js"; // Use default export
import userRoutes from "./routes/userRoutes.js"; // Use default export
import pricingRoutes from "./routes/pricingRoutes.js"; // Use default export
import transactionRoutes from "./routes/transactionRoutes.js"; // Use default export
import stockRoutes from "./routes/stockRoutes.js"; // Use default export

// Configure environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/stocks", stockRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
