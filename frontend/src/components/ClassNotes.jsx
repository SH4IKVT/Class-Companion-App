import React, { useState } from "react";
import { FileText } from "lucide-react";

const ClassNotes = () => {
  const [notes, setNotes] = useState([
    {
      subject: "Operating Systems",
      title: "Process Management",
      date: "2025-07-26",
      link: "#",
    },
    {
      subject: "DBMS",
      title: "Normalization Techniques",
      date: "2025-07-24",
      link: "#",
    },
    {
      subject: "Computer Networks",
      title: "TCP/IP Model",
      date: "2025-07-22",
      link: "#",
    },
  ]);

  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.title || !formData.file) {
      alert("Please fill all fields and select a file");
      return;
    }

    const newNote = {
      subject: formData.subject,
      title: formData.title,
      date: new Date().toISOString().split("T")[0],
      link: URL.createObjectURL(formData.file),
    };

    setNotes([newNote, ...notes]);
    setFormData({ subject: "", title: "", file: null });
  };

  return (
    <div className="bg-white p-4 shadow rounded-2xl">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">Class Notes</h2>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-6 space-y-3">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="title"
          placeholder="Topic Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
        <input
          type="file"
          name="file"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Notes
        </button>
      </form>

      {/* Notes Display */}
      <ul className="space-y-4">
        {notes.map((note, index) => (
          <li
            key={index}
            className="border p-3 rounded-lg hover:shadow transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-lg font-medium">{note.subject}</h3>
                <p className="text-sm text-gray-700">{note.title}</p>
                <p className="text-xs text-gray-500">Date: {note.date}</p>
              </div>
              <a
                href={note.link}
                className="mt-2 sm:mt-0 inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Notes
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassNotes;