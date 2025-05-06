import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { spawn } from "child_process"; // Import child_process for running the Python script
import path from 'path';  // For resolving absolute paths
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Importing routes
import authRoutes from "./routes/authRoutes.js"; // Use default export
import pricingRoutes from "./routes/pricingRoutes.js"; // Use default export
import transactionRoutes from "./routes/transactionRoutes.js"; // Use default export
import stockRoutes from "./routes/stockRoutes.js"; // Use default export

// Configure environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'PORT'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

// Initialize the app
const app = express();

// Security middlewares
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware to parse JSON
app.use(express.json());

// Update CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Enhanced MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// MongoDB connection error handler
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/stocks", stockRoutes);

// Input validation middleware for chat
const validateChatInput = (req, res, next) => {
    if (!req.body.message || typeof req.body.message !== 'string') {
        return res.status(400).json({ error: "Invalid message format" });
    }
    // Sanitize input
    req.body.message = req.body.message.trim();
    next();
};

// Route to handle chatbot requests
app.post("/chat", validateChatInput, (req, res) => {
    const userMessage = req.body.message;

    try {
        const pythonProcess = spawn('python', [
            path.resolve('./assets/styles/chatbot.py'), // Updated path
            userMessage
        ]);

        // Increased timeout to 15 seconds
        const timeout = setTimeout(() => {
            pythonProcess.kill();
            res.status(504).json({ error: "Request timed out" });
        }, 15000);

        // Handle request abortion
        req.on('close', () => {
            pythonProcess.kill();
            clearTimeout(timeout);
        });

        pythonProcess.stdout.on('data', (data) => {
            clearTimeout(timeout);
            const botResponse = data.toString();
            res.json({ response: botResponse });
        });

        pythonProcess.stderr.on('data', (error) => {
            clearTimeout(timeout);
            console.error(`Python Error: ${error.toString()}`);
            res.status(500).json({ error: "Internal server error" });
        });

        pythonProcess.on('close', (code) => {
            clearTimeout(timeout);
            if (code !== 0) {
                console.error(`Python process exited with code ${code}`);
                res.status(500).json({ error: `Process failed with code ${code}` });
            }
        });

    } catch (error) {
        console.error('Failed to start Python process:', error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});
