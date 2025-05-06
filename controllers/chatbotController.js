// controllers/chatbotController.js
const mongoose = require("mongoose");
const Chatbot = require("../models/Chatbot"); // MongoDB Model to store user interactions

// Example logic for chatbot responses
const chatbotResponses = {
  hello: "Hello! How can I assist you today?",
  stock: "Sure! Please provide the stock symbol and the time range for the prediction.",
  bye: "Goodbye! I hope you have a great day."
};

const respondToQuery = (query) => {
  // Simple matching (You can improve this based on your logic)
  if (query.includes("hello")) return chatbotResponses.hello;
  if (query.includes("stock")) return chatbotResponses.stock;
  if (query.includes("bye") || query.includes("thank you")) return chatbotResponses.bye;
  return "Sorry, I didn't understand that. Can you please rephrase?";
};

// Chatbot route
const chat = async (req, res) => {
  const { query } = req.body; // Get the query from the request body
  const response = respondToQuery(query);
  
  // Save the conversation to MongoDB (optional)
  const newChat = new Chatbot({
    userQuery: query,
    botResponse: response,
    timestamp: new Date()
  });
  await newChat.save();

  res.json({ response });
};

module.exports = { chat };
