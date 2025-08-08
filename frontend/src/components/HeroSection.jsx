import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <motion.div
          className="text-center md:text-left flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Empower Your Classroom with <br />
            <span className="text-blue-600"> All-in-One App</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Track assignments, share notes, resolve doubts, and receive announcements.
          </motion.p>

          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image with Animation */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.img
            src="/images/student-teacher-hero.jpeg"
            alt="Student and Teacher"
            className="w-full h-80 object-cover rounded-lg shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;