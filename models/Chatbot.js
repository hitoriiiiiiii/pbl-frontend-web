// models/Chatbot.js
import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  userQuery: { type: String, required: true },
  botResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chatbot = mongoose.model("Chatbot", chatbotSchema);
module.exports = Chatbot;
