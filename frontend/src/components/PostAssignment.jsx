import React from "react";
import { ClipboardList } from "lucide-react";

const PostAssignment = () => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <ClipboardList size={24} className="text-blue-600" />
        <h2 className="text-lg font-semibold">Post Assignment</h2>
      </div>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Assignment Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="date"
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostAssignment;