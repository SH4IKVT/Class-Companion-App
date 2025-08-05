import { FiCalendar, FiTrash2 } from "react-icons/fi";

export default function AnnouncementList({ announcements, userRole, onDelete }) {
  if (!announcements?.length) {
    return (
      <p className="text-center text-lg text-gray-500 mt-12">No announcements yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {announcements.map((a) => (
        <div key={a._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-[#333]">{a.title}</h3>
              <p className="text-gray-700 mt-2">{a.content}</p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <FiCalendar className="text-[#FF6F91]" />
                Deadline: {new Date(a.deadline).toLocaleDateString()}
              </p>
            </div>
            {userRole === 'teacher' && (
              <button onClick={() => onDelete(a._id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
