import React, { useState, useEffect, useRef } from "react";
import "./FinAi.css";
import BotImage from "../assets/styles/Fish Ai logo.png";

// Check for SpeechRecognition compatibility
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const FinAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const aiResponse = getAiResponse(input);

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");

    if ("speechSynthesis" in window) {
      speak(aiResponse.text);
    }
  };

  const handleMicClick = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleStopClick = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const getAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let responseText;

    if (lowerInput.includes("save")) {
      responseText =
        "Saving 20% of your income is a great practice for financial stability.";
    } else if (lowerInput.includes("investment")) {
      responseText =
        "Investments in mutual funds can be a balanced choice for beginners.";
    } else if (lowerInput.includes("track expenses")) {
      responseText =
        "Tracking expenses is easy with marketFish. Categorize and control your spending efficiently.";
    } else {
      responseText =
        "Hi! Ask me about saving, investments, or tracking expenses.";
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
        <img src={BotImage} alt="marketFish Bot" className="bot-image" />
        <h1>Chat with marketFish</h1>
        <p>Your personal finance assistant</p>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask something about savings, investment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          🚀
        </button>
        <button onClick={handleMicClick} className="chat-mic-button">
          🎤
        </button>
        <button onClick={handleStopClick} className="chat-stop-button">
          🛑
        </button>
      </div>
    </div>
  );
};

export default FinAi;
