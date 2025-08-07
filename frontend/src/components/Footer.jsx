import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-slate-700 text-white py-6 dark:bg-slate-900 dark:text-gray-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm mb-3">
          &copy; {new Date().getFullYear()} Class Companion. All rights reserved. Built with ❤️ by Udaan
        </p>

        <div className="flex justify-center gap-6 mt-2 text-xl">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:ariddhi835@gmail.com" className="hover:text-indigo-400 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};


export default Footer;
