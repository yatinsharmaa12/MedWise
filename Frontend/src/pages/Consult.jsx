import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DoctorCard from "../components/DoctorCard";
import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpg";

function ConsultationPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Replace this with your API call
  const fetchDoctors = async () => {
    const mockDoctors = [
      { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", bio: "Experienced Cardiologist with 10+ years of experience.", image: doctor1, contact: "+1 (555) 123-4567" },
      { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", bio: "Expert Dermatologist specializing in skin treatments.", image: doctor2, contact: "+1 (555) 987-6543" },
      { id: 3, name: "Dr. Mary Johnson", specialty: "Orthopedist", bio: "Specialist in bone and joint treatments.", image: doctor1, contact: "+1 (555) 246-8135" },
      { id: 4, name: "Dr. James Brown", specialty: "Pediatrician", bio: "Experienced Pediatrician for children's health.", image: doctor2, contact: "+1 (555) 369-2580" },
    ];
    setDoctors(mockDoctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-8">Consult a Doctor</h2>
      <p className="text-lg text-center text-gray-300 mb-8">Find specialists and start your consultation journey.</p>

      {/* Filter/Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by specialty"
          className="px-4 py-2 w-full max-w-md rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Doctors Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default ConsultationPage;

