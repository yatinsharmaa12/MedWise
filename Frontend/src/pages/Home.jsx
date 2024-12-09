import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Activity, FileText, Brain, ChevronDown, Check, X } from 'lucide-react';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-12 h-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, author, rating }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
    <p className="text-lg italic mb-4">{quote}</p>
    <p className="font-semibold text-right">- {author}</p>
  </motion.div>
);

function Home() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulating form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6 z-10"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to MedWise
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Your intelligent health companion. Empowering you with personalized care and insights.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: Math.random() * 0.5, scale: 1 }}
              transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 cursor-pointer"
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Activity}
              title="Smart Consultations"
              description="Connect with AI-assisted doctors for precise diagnoses and personalized care plans."
              delay={0.2}
            />
            <FeatureCard
              icon={FileText}
              title="Secure Health Records"
              description="Store and access your medical reports securely using advanced encryption."
              delay={0.4}
            />
            <FeatureCard
              icon={Brain}
              title="AI Health Insights"
              description="Receive AI-powered analysis of your health data for proactive wellness management."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Our Features</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Smart Consultations', 'Secure Health Records', 'AI Health Insights'].map((feature) => (
              <motion.button
                key={feature}
                className={`px-4 py-2 rounded-full ${
                  activeFeature === feature ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFeature(feature)}
              >
                {feature}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeFeature && (
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{activeFeature}</h3>
                <p className="text-gray-600">
                  {activeFeature === 'Smart Consultations' && 
                    "Experience the future of healthcare with our AI-assisted consultations. Our smart system helps doctors provide more accurate diagnoses and tailored treatment plans."}
                  {activeFeature === 'Secure Health Records' && 
                    "Your health data is precious. We use state-of-the-art encryption to ensure your medical records are safe, accessible only to you and your authorized healthcare providers."}
                  {activeFeature === 'AI Health Insights' && 
                    "Harness the power of artificial intelligence to gain deeper insights into your health. Our AI analyzes your data to provide personalized recommendations for a healthier lifestyle."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="MedWise has revolutionized how I manage my health. The AI insights are incredibly accurate!"
              author="Sarah Johnson"
              rating={5}
            />
            <TestimonialCard 
              quote="The secure health records feature gives me peace of mind. I can access my data anytime, anywhere."
              author="Michael Chen"
              rating={4}
            />
            <TestimonialCard 
              quote="Smart consultations have saved me so much time. It's like having a doctor in my pocket!"
              author="Emily Rodriguez"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Get In Touch</h2>
          <p className="text-xl text-center mb-12">We'd love to hear from you. Reach out to us for any queries or support.</p>
          <motion.form
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </motion.form>
          <AnimatePresence>
            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mt-4 p-4 rounded-lg text-center ${
                  formStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {formStatus === 'success' ? (
                  <p className="flex items-center justify-center">
                    <Check className="mr-2" /> Message sent successfully!
                  </p>
                ) : (
                  <p className="flex items-center justify-center">
                    <X className="mr-2" /> There was an error sending your message. Please try again.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

