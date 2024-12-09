import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

function ChatPage() {
  const { doctorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Mock data for doctor and user details
  const doctorDetails = { name: "Dr. John Doe", specialization: "Cardiologist" };
  const userDetails = { name: "Jane Smith", age: 30 };

  useEffect(() => {
    socket.emit("join", doctorId);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with Doctor and User Details */}
      <div className="bg-blue-700 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">{doctorDetails.name}</h2>
            <p className="text-sm">{doctorDetails.specialization}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">{userDetails.name}</h2>
            <p className="text-sm">Age: {userDetails.age}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 shadow-inner">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
