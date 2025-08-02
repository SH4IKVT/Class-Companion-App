import { useEffect, useState } from "react";
import { fetchAssignments, postAssignment } from "../lib/api";
import AssignmentUploadForm from "../components/assignments/AssignmentUploadForm";
import AssignmentList from "../components/assignments/AssignmentList";

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments()
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error("Error loading assignments:", err));
  }, []);

  const handleUpload = async (formData) => {
    const { data } = await postAssignment(formData);
    setAssignments((prev) => [data, ...prev]);
    return { data };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3] p-12">
      <h1 className="text-5xl font-extrabold text-[#6B73FF] mb-8 text-center">
        Upload Assignment
      </h1>

      <AssignmentUploadForm onUpload={handleUpload} />

      <hr className="my-16 border-[#6B73FF]/30" />

      <h2 className="text-4xl font-bold text-[#6B73FF] mb-8 text-left">
        All Assignments
      </h2>

      <AssignmentList assignments={assignments} />
    </div>
  );
}
