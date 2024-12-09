import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

function ChatPage() {
  const { doctorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Join the room
    socket.emit("join", doctorId);

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("message");
      socket.emit("leave", doctorId);
    };
  }, [doctorId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      socket.emit("sendMessage", { room: doctorId, message: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;

