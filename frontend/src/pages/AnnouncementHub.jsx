import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { fetchAnnouncements, postAnnouncement, deleteAnnouncement } from "../lib/api";
import { userAtom } from "../lib/atom";
import AnnouncementUploadForm from "../components/announcements/AnnouncementUploadForm";
import AnnouncementList from "../components/announcements/AnnouncementList";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [user] = useAtom(userAtom);

  // Load all announcements
  const loadAnnouncements = async () => {
    try {
      const res = await fetchAnnouncements();
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Handle teacher posting
  const handleUpload = async (data) => {
    try {
      const res = await postAnnouncement(data);
      setAnnouncements((prev) => [res.data, ...prev]);
      alert("Announcement posted");
      return res.data;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post announcement");
    }
  };

  // Handle teacher deletion
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
      alert("Announcement deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] p-12">
      <h1 className="text-5xl font-extrabold text-[#FF8F00] mb-8 text-center">
        Announcements
      </h1>

      {/* show upload form only to teachers */}
      {user?.type === "teacher" && (
        <>
          <AnnouncementUploadForm onUpload={handleUpload} />
          <hr className="my-16 border-[#FF8F00]/30" />
        </>
      )}

      {/* list for both roles */}
      <AnnouncementList
        announcements={announcements}
        userRole={user?.type}
        onDelete={handleDelete}
      />
    </div>
  );
}
