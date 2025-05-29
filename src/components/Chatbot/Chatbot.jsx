import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../../data";

import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào, tôi có thể giúp gì?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true); // ← Bắt đầu loading

    try {
      const res = await axios.post(`${endpoint}/user/ask`, { message: input });
      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = { sender: "bot", text: "Lỗi kết nối đến chatbot." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false); // ← Kết thúc loading
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>📚 Chat với BookBot</span>
            <button onClick={toggleChat} className="chatbot-close">
              ✖
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot">
                <em>Thinking...</em>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Nhập tin nhắn..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
