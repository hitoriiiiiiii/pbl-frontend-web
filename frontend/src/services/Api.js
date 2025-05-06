import axios from "axios";

// Base URL of your backend (adjust if needed)
const API = axios.create({
  baseURL: "http://localhost:5173/api", // Replace with your backend's base URL (e.g., '/api')
});

// Register a new user
export const registerUser = (userData) => API.post("/auth/register", userData); // Update the path if needed

// Login a user
export const loginUser = (userData) => API.post("/auth/login", userData); // Update the path if needed

// Send message to chatbot and get the response
export const getChatbotResponse = (userMessage) => {
  return API.post("/chat", { message: userMessage }); // Sending the message to the backend chatbot endpoint
};
