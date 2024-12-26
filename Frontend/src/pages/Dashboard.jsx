import React, { useEffect, useState } from 'react';
import DoctorForm from './DoctorForm';
import axios from 'axios';
import { FaUserMd, FaCalendarAlt, FaGraduationCap, FaInfoCircle } from 'react-icons/fa';

const Dashboard = ({ userType, initialDoctorData }) => {
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const [isVisible, setIsVisible] = useState(doctorData?.visible);
  const [doctorImage, setDoctorImage] = useState(doctorData?.image || '');
  const [showForm, setShowForm] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // Upload logic here...
  };

  useEffect(() => {}, []);

  const handleFormSubmit = (updatedData) => {
    setDoctorData(updatedData);
    setIsVisible(updatedData.visible);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
      <div className="w-full px-4 py-5 max-w-4xl p-8 bg-white shadow-lg rounded-xl relative">
        {/* Profile Image Section */}
        <div className="absolute py-9 top-4 right-1 transform -translate-x-1/2 flex flex-col items-center">
          <img
            src={doctorImage || 'https://via.placeholder.com/150'}
            alt="Doctor Profile"
            className="w-28 h-28 object-cover rounded-full border-4 border-blue-500 shadow-md"
          />
          <label className="mt-3 text-sm text-gray-700 font-medium cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            Change Image
          </label>
        </div>

        <div className="mt-36 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center">Doctor Dashboard</h2>

          <div className="text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {showForm ? 'Close Form' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            <DataBox
              icon={<FaUserMd size={20} className="text-blue-500" />}
              title="Specialization"
              content={doctorData?.specialization}
            />
            <DataBox
              icon={<FaCalendarAlt size={20} className="text-green-500" />}
              title="Experience"
              content={`${doctorData?.experience} years`}
            />
            <DataBox
              icon={<FaGraduationCap size={20} className="text-yellow-500" />}
              title="Qualification"
              content={doctorData?.qualification}
            />
            <div className="col-span-1 lg:col-span-3">
              <DataBox
                icon={<FaInfoCircle size={20} className="text-purple-500" />}
                title="Description"
                content={doctorData?.description}
                large
              />
            </div>

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

          {showForm && <DoctorForm onSubmit={handleFormSubmit} />}
        </div>
      </div>
    </div>
  );
};

const DataBox = ({ title, content, icon, large }) => (
  <div
    className={`p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 ${
      large ? 'col-span-full' : ''
    }`}
  >
    <div>{icon}</div>
    <div>
      <h4 className="text-lg font-medium text-gray-700">{title}</h4>
      <p className="text-gray-600">{content || 'Not provided'}</p>
    </div>
  </div>
);

export default Dashboard;
