import React from "react";

function DoctorProfile({ doctor }) {
  return (
    <div className="card bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-sm">
      {/* Doctor's Image */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      
      {/* Doctor's Details */}
      <h3 className="text-xl font-semibold text-center mb-2">{doctor.name}</h3>
      <p className="text-center text-lg text-gray-400 mb-4">{doctor.specialty}</p>

      {/* Bio */}
      <p className="text-center text-gray-300 mb-4">{doctor.bio}</p>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition">
          Chat
        </button>
        <button className="btn btn-sm bg-green-600 text-white hover:bg-green-700 transition">
          Video Call
        </button>
      </div>
    </div>
  );
}

export default DoctorProfile;
