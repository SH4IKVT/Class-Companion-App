import React from "react";
import {MdNote, MdBook, MdPerson, MdAttachFile} from "react-icons/md";

export default function NoteList({ notes }) {
  if (!notes?.length) {
    return (
      <p className="text-center text-lg text-gray-500 mt-12">
        No notes available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {notes.map((n) => (
        <div
          key={n._id}
          className="
            bg-white p-6 rounded-2xl shadow-md
            border border-gray-100
            transform transition-all duration-200
            hover:-translate-y-1 hover:shadow-lg
            w-full
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MdNote className="text-3xl text-[#FF6F91]" />
              <h3 className="text-2xl font-semibold text-gray-800">
                {n.title}
              </h3>
            </div>
            {n.fileUrl && (
              <a
                href={n.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1
                  text-[#FF6F91] hover:text-red-600
                  text-sm font-medium
                "
              >
                View File
                <MdAttachFile className="text-lg" />
              </a>
            )}
          </div>

          {/* Details */}
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <MdBook className="text-xl text-[#FF6F91]" />
              <span className="font-medium">Subject:</span> {n.subject}
            </li>
            <li className="flex items-center gap-2">
              <MdPerson className="text-xl text-[#FF6F91]" />
              <span className="font-medium">Uploaded by:</span>{" "}
              {n.uploader?.name?.trim() || <span className="italic text-gray-400">Unknown</span>}
</li>

          </ul>
        </div>
      ))}
    </div>
  );
}
