import React from 'react';
import { motion } from 'framer-motion';
import  Footer from '../components/Footer';
function Home() {
  return (
    <div className="flex flex-col">
      
      {/* Section 1: Hero Section */}
      <section className="min-h-screen bg-blue-600 flex items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Medwise</h1>
          <p className="text-lg max-w-md mx-auto">
            Your all-in-one health management platform. Connect with doctors, access reports, and receive personalized health insights.
          </p>
        </motion.div>
      </section>

      {/* Section 2: Features */}
      <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center py-12 px-6">
        <h2 className="text-4xl font-semibold mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white shadow-lg p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-2">Consultation</h3>
            <p>Connect with certified doctors for detailed consultations.</p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-2">Secure Reports</h3>
            <p>Store and access your reports securely using IPFS technology.</p>
          </motion.div>
          <motion.div
            className="bg-white shadow-lg p-6 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-2xl font-bold mb-2">AI Analysis</h3>
            <p>Get insights into your health with AI-driven report analysis.</p>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Testimonials */}
      <section className="min-h-screen bg-white flex flex-col items-center justify-center text-center py-12 px-6">
        <h2 className="text-4xl font-semibold mb-8">What Our Users Say</h2>
        <p className="text-lg max-w-2xl">
          "Medwise has transformed how I manage my health! The AI insights are spot-on, and scheduling a consultation is so easy!"
        </p>
        <p className="mt-4 text-gray-600">- Happy User</p>
      </section>

      <section className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center text-center py-12 px-6">
  <h2 className="text-4xl font-semibold mb-8">Get In Touch</h2>
  <p className="text-lg mb-6">We'd love to hear from you. Please fill out the form below to contact us.</p>

  <form className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-md">
    {/* Name Field */}
    <div className="mb-6">
      <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Email Field */}
    <div className="mb-6">
      <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Message Field */}
    <div className="mb-6">
      <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
      <textarea
        id="message"
        name="message"
        className="w-full p-3 rounded-md bg-gray-700 text-white border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        required
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition duration-300"
    >
      Send Message
    </button>
  </form>
</section>

      <Footer />
    </div>
  );
}

export default Home;
