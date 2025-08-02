import { useState } from "react";
import {
  FiFileText,
  FiBookOpen,
  FiUpload,
  FiPaperclip
} from "react-icons/fi";

export default function NoteUploadForm({ onUpload }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please attach a note file.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    await onUpload(formData);
    setTitle("");
    setSubject("");
    setFile(null);
    e.target.reset();
  };

  const baseInput = `
    w-full p-4 bg-white text-[#2D2D34]
    rounded-xl border border-[#FCE4EC]
    focus:outline-none focus:ring-2 focus:ring-[#FF6F91]
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-4xl mx-auto p-8 bg-white
        rounded-3xl shadow-lg grid grid-cols-1 gap-6 md:grid-cols-2
      "
    >
      {/* Title */}
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

      {/* Subject */}
      <div className="relative">
        <FiBookOpen className="absolute left-4 top-4 text-[#FF6F91] text-xl" />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`${baseInput} pl-12`}
        />
      </div>

      {/* File Upload */}
      <div className="relative md:col-span-2">
        <FiPaperclip className="absolute left-4 top-4 text-[#FF6F91] text-xl" />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className={`
            ${baseInput.replace("pl-12", "pl-12 pr-12")}
            file:border-none file:bg-[#FF6F91] file:text-white
            file:px-4 file:py-2 file:rounded-lg file:cursor-pointer
          `}
        />
        {file && (
          <span className="absolute right-4 top-4 text-[#333333] text-sm">
            {file.name}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          md:col-span-2 mx-auto flex items-center gap-3
          bg-gradient-to-r from-[#66BB6A] to-[#43A047]
          text-white font-semibold px-8 py-4 rounded-2xl shadow-md
          hover:scale-105 transition-transform duration-200
        "
      >
        <FiUpload className="text-2xl" />
        Upload Note
      </button>
    </form>
  );
}
