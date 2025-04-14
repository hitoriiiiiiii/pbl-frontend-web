import axios from "axios";

// Base URL of your backend (adjust if needed)
const API = axios.create({
  baseURL: "http://localhost:5174/api", // Replace with your backend's base URL (e.g., '/api')
});

// Register a new user
export const registerUser = (userData) => API.post("/auth/register", userData); // Update the path if needed

// Login a user
export const loginUser = (userData) => API.post("/auth/login", userData); // Update the path if needed
