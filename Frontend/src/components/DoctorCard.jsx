import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${doctor.id}`);
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
        <p className="text-blue-400 mb-2">{doctor.specialty}</p>
        <p className="text-gray-400 text-sm mb-4">{doctor.bio}</p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-300 text-sm mb-4"
        >
          Contact: {doctor.contact}
        </motion.div>
        
        <button
          onClick={handleChat}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Start Chat
        </button>
      </div>
    </motion.div>
  );
}

export default DoctorCard;

