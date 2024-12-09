// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import DoctorForm from './DoctorForm';
import axios from 'axios';

const Dashboard = ({ userType, initialDoctorData }) => {
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const [isVisible, setIsVisible] = useState(doctorData?.visible);
  const [doctorImage, setDoctorImage] = useState(doctorData?.image || '');
  const [showForm, setShowForm] = useState(false); 

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    
  };

  
    useEffect(() => {}, []);


  // Handle form submission to update doctor data
  const handleFormSubmit = (updatedData) => {
    setDoctorData(updatedData);
    setIsVisible(updatedData.visible);
    setShowForm(false); // Close the form after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg relative">
        
        {/* Profile Image Section */}
        <div className="absolute top-4 left-4 flex flex-col items-center">
          <img
            src={doctorImage || 'https://via.placeholder.com/150'}
            alt="Doctor Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow-md"
          />
          <label className="mt-2 text-sm text-gray-600 font-medium cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            Upload Image
          </label>
        </div>

        <div className="mt-28 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Doctor Dashboard</h2>
          
          {/* Button to Toggle DoctorForm */}
          <div className="text-center">
            <button
              onClick={() => setShowForm(!showForm)} 
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {showForm ? 'Close Form' : 'Edit Profile'}
            </button>
          </div>

          {/* Display doctor information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <DataBox title="Specialization" content={doctorData?.specialization} />
            <DataBox title="Experience" content={`${doctorData?.experience} years`} />
            <DataBox title="Qualification" content={doctorData?.qualification} />
            <div className="col-span-1 lg:col-span-3">
              <DataBox title="Description" content={doctorData?.description} large />
            </div>

            {/* Visibility Display */}
            <div className="col-span-1">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Visibility</h4>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
                  isVisible
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {isVisible ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>

          {/* Conditionally render DoctorForm based on showForm state */}
          {showForm && (
            <DoctorForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};


const DataBox = ({ title, content, large }) => (
  <div className={`p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${large ? 'col-span-full' : ''}`}>
    <h4 className="text-lg font-medium text-gray-700 mb-2">{title}</h4>
    <p className="text-gray-600">{content || "Not provided"}</p>
  </div>
);

export default Dashboard;
