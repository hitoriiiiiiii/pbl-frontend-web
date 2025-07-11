import axios from "axios";

// ✅ Use Vite proxy or switch to your backend port directly
const API = axios.create({
  baseURL: "/api", // OR use: "http://localhost:5000/api" if not using proxy
});

// Auth
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// Chatbot
export const getChatbotResponse = (userMessage) =>
  API.post("/chat", { message: userMessage });

// ✅ Pricing (GET plans from DB)
export const getPricingPlans = () => API.get("/pricing");

// ✅ Payment (POST to create order)
export const createPaymentOrder = (planName) =>
  API.post("/payment/create-order", { plan: planName });
