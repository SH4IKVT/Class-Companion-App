import React from "react";
import { Mail, MessageSquareHeart } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="bg-blue-50 py-16 px-4" id="contact">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading with icon */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <MessageSquareHeart className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Contact Us
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          For any queries related to the Class Companion platform, feel free to reach out to the development team.
        </p>

        {/* Email with Icon */}
        <div className="flex justify-center items-center gap-2 mb-8 text-gray-700 text-base sm:text-lg font-medium">
          <Mail className="w-5 h-5 text-orange-500" />
          udaan1234@gmail.com 
        </div>

        {/* Get in Touch Button */}
        <button
          type="button"
          className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-md shadow-md animate-[pulseGlow_3s_ease-in-out_infinite] transition duration-300"
          disabled
        >
          Get in Touch
        </button>
      </div>

      {/* Slow Glow Animation */}
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 0px rgba(255, 165, 0, 0.4);
            }
            50% {
              box-shadow: 0 0 12px rgba(255, 165, 0, 0.6);
            }
          }
        `}
      </style>
    </section>
  );
};


export default ContactSection;
