import React, { useState } from "react";
import "./FinAi.css";
import BotImage from "../assets/styles/finai-avtar.png"; // make sure the path is correct

const FinAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const aiResponse = getAiResponse(input);

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");

    // Speak out AI response
    if ("speechSynthesis" in window) {
      speak(aiResponse.text);
    }
  };

  const getAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let responseText;

    if (lowerInput.includes("save")) {
      responseText = "Saving 20% of your income is a great practice for financial stability.";
    } else if (lowerInput.includes("investment")) {
      responseText = "Investments in mutual funds can be a balanced choice for beginners.";
    } else if (lowerInput.includes("track expenses")) {
      responseText = "Tracking expenses is easy with FinAi. Categorize and control your spending efficiently.";
    } else {
      responseText = "Hi! Ask me about saving, investments, or tracking expenses.";
    }

    return { sender: "ai", text: responseText };
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="finai-container">
      <div className="chat-header">
        <img src={BotImage} alt="FinAi Bot" className="bot-image" />
        <h1>Chat with FinAi</h1>
        <p>Your personal finance assistant</p>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === "user" ? "user-message" : "ai-message"}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Ask something about savings, investment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default FinAi;
