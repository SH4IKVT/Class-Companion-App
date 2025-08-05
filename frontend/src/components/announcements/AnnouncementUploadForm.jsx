import { useState } from "react";
import { FiFileText, FiCalendar, FiUpload } from "react-icons/fi";

export default function AnnouncementUploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content, deadline };
    await onUpload(data);
    setTitle("");
    setContent("");
    setDeadline("");
  };

  const baseInput = `
    // w-full p-4 bg-white text-[#2D2D34]
    // rounded-xl border border-[#E4E7EB]
    // focus:outline-none focus:ring-2 focus:ring-[#6B73FF]
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-lg grid grid-cols-1 gap-6"
    >
      <div className="relative">
        <FiFileText className="absolute left-4 top-4 text-[#FF6F91] text-xl" />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${baseInput} pl-12`}
        />
      </div>

      <textarea
        rows={5}
        placeholder="Announcement Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`${baseInput} resize-none`}
      />

      <div className="relative">
        <FiCalendar className="absolute right-4 pointer-events-none top-4 text-[#FF6F91] text-xl" />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={`${baseInput} pl-12`}
        />
      </div>

      <button
        type="submit"
        className="mx-auto flex items-center gap-3 bg-gradient-to-r from-[#6B73FF] to-[#000DFF] text-white font-semibold px-8 py-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
      >
        <FiUpload className="text-2xl" />
        Post Announcement
      </button>
    </form>
  );
}
