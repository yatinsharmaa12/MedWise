// DoctorForm.jsx
import React, { useEffect, useState } from 'react';

const DoctorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    specialization: '',
    experience: '',
    qualification: '',
    description: '',
    visible: true,
  });

   
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent component (Dashboard)
  };


  useEffect(() => {
    
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold text-white-800">Update Doctor Information</h3>

      <label className="block">
        Specialization
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Experience (years)
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Qualification
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex items-center">
        <input
          type="checkbox"
          name="visible"
          checked={formData.visible}
          onChange={handleChange}
          className="mr-2"
        />
        Make Profile Visible
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Save Changes
      </button>
    </form>
  );
};

export default DoctorForm;
