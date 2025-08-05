
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa"
function PortalSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h3
          className="text-3xl font-bold text-indigo-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Access Your Portal
        </motion.h3>

        <motion.p
          className="text-gray-700 mb-10 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Choose your role to explore the platform features designed for students and teachers.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Student Portal */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 hover:shadow-xl transition dark:bg-slate-800"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center mb-4 text-blue-600 text-4xl">
              <FaUserGraduate />
            </div>
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Student Portal</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Students can ask doubts, submit assignments and access shared notes — all in one place.
            </p>
          </motion.div>

          {/* Teacher Portal */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 hover:shadow-xl transition dark:bg-slate-800"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4 text-green-600 text-4xl">
              <FaChalkboardTeacher />
            </div>
            <h4 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Teacher Portal</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Teachers can manage class discussions, post announcements, upload study materials and assignments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PortalSection;