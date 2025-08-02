import { useState, useEffect } from "react";
import { fetchNotes, postNote } from "../lib/api";
import NoteUploadForm from "../components/notes/NoteUploadForm";
import NoteList from "../components/notes/NoteList";

export default function NotesLibrary() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const res = await fetchNotes();
    setNotes(res.data);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleUpload = async (formData) => {
    try {
      await postNote(formData);
      alert("Note uploaded");
      loadNotes();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to upload");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] p-12">
      <h1 className="text-5xl font-extrabold text-[#2E7D32] mb-8 text-center">
        Upload Notes
      </h1>

      <NoteUploadForm onUpload={handleUpload} />

      <hr className="my-16 border-[#43A047]/30" />

      <h2 className="text-5xl font-extrabold text-[#2E7D32] mb-8 text-left">
        All Notes
      </h2>

      <NoteList notes={notes} />
    </div>
  );
}
