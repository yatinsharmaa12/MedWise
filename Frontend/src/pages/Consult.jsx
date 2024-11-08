import React, { useState, useEffect } from "react";
import DoctorProfile from "../components/DoctorProfile";  // Import the DoctorProfile component
import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpg";

function ConsultationPage() {
  const [doctors, setDoctors] = useState([]);

  // Mock data - Replace this with your API call
  const fetchDoctors = async () => {
    const mockDoctors = [
      { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", bio: "Experienced Cardiologist with 10+ years of experience.", image: doctor1 },
      { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", bio: "Expert Dermatologist specializing in skin treatments.", image: doctor2 },
      { id: 3, name: "Dr. Mary Johnson", specialty: "Orthopedist", bio: "Specialist in bone and joint treatments.", image: doctor1},
      { id: 4, name: "Dr. James Brown", specialty: "Pediatrician", bio: "Experienced Pediatrician for children's health.", image: doctor2 },
      // Add more doctors as needed
    ];
    setDoctors(mockDoctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="min-h-screen bg-gray-800 text-white py-12 px-6">
      <h2 className="text-4xl font-semibold text-center mb-8">Consult a Doctor</h2>
      <p className="text-lg text-center text-gray-400 mb-8">Find doctors based on your specialty and start a consultation.</p>

      {/* Filter/Search - Add functionality as needed */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by specialty"
          className="px-4 py-2 w-1/2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {doctors.map((doctor) => (
          <DoctorProfile key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}

export default ConsultationPage;
