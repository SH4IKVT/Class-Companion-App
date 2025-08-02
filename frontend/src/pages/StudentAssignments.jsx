import { useEffect, useState } from "react";
import { fetchAssignments }            from "../lib/api";
import AssignmentList                  from "../components/assignments/AssignmentList";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments()
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error("Error fetching assignments:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3] p-12">
      <h1 className="text-5xl font-extrabold text-[#6B73FF] mb-8 text-center">
        Your Assignments
      </h1>
      <AssignmentList assignments={assignments} />
    </div>
  );
}
