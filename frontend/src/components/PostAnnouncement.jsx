import React from "react";
import { Megaphone } from "lucide-react";

const PostAnnouncement = () => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Megaphone size={24} className="text-orange-500" />
        <h2 className="text-lg font-semibold">Post Announcement</h2>
      </div>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Announcement Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Announcement Details"
          className="w-full border p-2 rounded"
        ></textarea>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Announce
        </button>
      </form>
    </div>
  );
};

export default PostAnnouncement;