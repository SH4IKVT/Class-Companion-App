import React from "react";
import { MdNoteAdd } from "react-icons/md"; // Colorful Material Design icon

const PostNotes = () => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <MdNoteAdd size={28} className="text-purple-600" />
        <h2 className="text-lg font-semibold">Upload & View Notes</h2>
      </div>
      <form className="space-y-3">
        <input type="file" className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
};

export default PostNotes;