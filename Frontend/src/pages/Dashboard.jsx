import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ userType, userData, doctorData }) => {
  // const [doctorImage, setDoctorImage] = useState(doctorData?.image || '');

  // // Handle image upload for doctor
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   try {
  //     const response = await axios.post('/api/upload', formData);
  //     setDoctorImage(response.data.imageUrl);
  //   } catch (error) {
  //     console.error("Image upload failed", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        {userType === 'doctor' ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DataBox title="Specialization" content={doctorData?.specialization} />
              <DataBox title="Experience" content={`${doctorData?.experience} years`} />
              <DataBox title="Qualification" content={doctorData?.qualification} />
              <div className="col-span-1 lg:col-span-3">
                <DataBox title="Description" content={doctorData?.description} large />
              </div>
              <DataBox title="Visibility" content={doctorData?.visible ? "Visible" : "Hidden"} />
            </div>

            <div className="mt-6 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Image</h3>
              <img
                src={doctorImage || 'https://via.placeholder.com/150'}
                alt="Doctor Profile"
                className="w-32 h-32 object-cover rounded-full border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 text-sm text-gray-600"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">User Dashboard</h2>
            <DataBox title="Messages" content={userData?.messages || "No new messages"} />
            <DataBox title="Report Records" content={userData?.reports || "No reports available"} large />
            <DataBox title="Personal Information" content={userData?.personalData || "No data available"} large />
          </div>
        )}
      </div>
    </div>
  );
};

// Component for data boxes
const DataBox = ({ title, content, large }) => (
  <div className={`p-4 border rounded-md ${large ? 'col-span-full' : ''}`}>
    <h4 className="text-lg font-medium text-gray-700">{title}</h4>
    <p className="mt-2 text-gray-600">{content || "Not provided"}</p>
  </div>
);

export default Dashboard;
