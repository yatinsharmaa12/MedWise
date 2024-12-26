import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { Send, Clock, Calendar } from 'lucide-react';

const socket = io("http://localhost:3001"); // Replace with your server URL

function ChatPage() {
  const { doctorId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Mock data for doctor and user details
  const doctorDetails = { 
    name: "Dr. John Doe", 
    specialization: "Cardiologist",
    experience: "15 years",
    nextAvailable: "Tomorrow, 10:00 AM",
    avatar: "/placeholder.svg?height=256&width=256"
  };
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
    <div className="flex h-screen bg-gray-900 text-white">
  {/* Sidebar with Doctor Details */}
  <div className="w-80 bg-gray-800 p-6 shadow-lg flex flex-col space-y-6" style={{ marginTop: "4rem" }}>
    <div className="text-center">
      <img
        src={doctorDetails.avatar}
        alt={doctorDetails.name}
        className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md border-4 border-blue-500"
      />
      <h2 className="text-2xl font-bold text-blue-300">{doctorDetails.name}</h2>
      <p className="text-lg text-blue-400">{doctorDetails.specialization}</p>
    </div>
    <div className="space-y-4">
      <div className="flex items-center text-gray-300">
        <Clock size={20} className="mr-2 text-blue-400" />
        <p>{doctorDetails.experience} of experience</p>
      </div>
      <div className="flex items-center text-gray-300">
        <Calendar size={20} className="mr-2 text-blue-400" />
        <p>Next available: {doctorDetails.nextAvailable}</p>
      </div>
    </div>
    <div className="mt-6 p-4 bg-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-300 mb-2">Patient Details</h3>
      <p className="text-gray-300">Name: {userDetails.name}</p>
      <p className="text-gray-300">Age: {userDetails.age}</p>
    </div>
  </div>

  {/* Chat Area */}
  <div className="flex-1 flex flex-col bg-gray-900" style={{ marginTop: "4rem" }}>
    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 ${
            msg.sender === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
              msg.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input Field */}
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default ChatPage;
