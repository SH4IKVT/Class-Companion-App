import { motion } from "framer-motion";
import {
  HelpCircle,
  ClipboardList,
  Megaphone,
  NotebookPen
} from "lucide-react";

function FeatureSection() {
  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-indigo-600 dark:text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Doubt Sharing"
            description="Easily ask and resolve doubts within your class."
            icon={<HelpCircle className="w-10 h-10 text-indigo-600 mb-3" />}
            bgColor="bg-indigo-100"
          />
          <FeatureCard
            title="Assignment Tracker"
            description="Stay on top of upcoming and pending assignments."
            icon={<ClipboardList className="w-10 h-10 text-pink-600 mb-3" />}
            bgColor="bg-pink-100"
          />
          <FeatureCard
            title="Announcements"
            description="Never miss important class updates and notices."
            icon={<Megaphone className="w-10 h-10 text-yellow-600 mb-3" />}
            bgColor="bg-yellow-100"
          />
          <FeatureCard
            title="Notes Sharing"
            description="Access and contribute study material anytime."
            icon={<NotebookPen className="w-10 h-10 text-green-600 mb-3" />}
            bgColor="bg-green-100"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon, bgColor }) {
  return (
    <motion.div
      className={'p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border ${bgColor}'}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {icon}
      <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

export default FeatureSection;